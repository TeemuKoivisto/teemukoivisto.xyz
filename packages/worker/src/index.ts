import type { Comment, CommentObject, CreateCommentRequest } from '@teemukoivisto.xyz/utils'

export interface Env {
  BUCKET: R2Bucket
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,PUT,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}

async function handleOptions(request: Request) {
  if (
    request.headers.get('Origin') !== null &&
    request.headers.get('Access-Control-Request-Method') !== null &&
    request.headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS preflight requests.
    return new Response(null, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '',
      },
    })
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        Allow: 'GET, HEAD, POST, OPTIONS',
        'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '',
      },
    })
  }
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url)
    const slug = url.pathname.slice(1)

    switch (request.method) {
      case 'OPTIONS':
        return handleOptions(request)
      case 'POST':
        const body = await request.json<CreateCommentRequest>()
        const old = await env.BUCKET.get(slug)
        let json: CommentObject = {
          comments: [],
        }
        if (old) {
          json = await old.json()
        }
        if ('comments' in json) {
          try {
            json.comments.push({
              ...body,
              created_at: Date.now(),
              metadata: {},
            })
          } catch (err) {}
        }
        await env.BUCKET.put(slug, JSON.stringify(json))
        return new Response(`Put ${slug} successfully!`, {
          status: 201,
          headers: {
            'Access-Control-Allow-Origin': '*',
            // ...corsHeaders,
            // Allow: 'GET, HEAD, POST, OPTIONS',
            // 'Access-Control-Allow-Headers':
            //   request.headers.get('Access-Control-Request-Headers') || '',
          },
        })
      case 'GET':
        const result = await env.BUCKET.get(slug)
        const fetched = result && (await result.json<CommentObject>())
        if (!fetched) {
          return new Response(null, {
            status: 404,
          })
        }
        const headers = new Headers()
        result.writeHttpMetadata(headers)
        headers.set('etag', result.httpEtag)
        return new Response(JSON.stringify(fetched), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        })
      // case 'DELETE':
      //   await env.BUCKET.delete(key)
      //   return new Response('Deleted!')

      default:
        return new Response('Method Not Allowed', {
          status: 405,
          headers: {
            Allow: 'GET, POST, PUT, DELETE, OPTIONS',
          },
        })
    }
  },
}
