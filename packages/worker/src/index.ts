import type { Comment, CommentObject, CreateCommentRequest } from '@teemukoivisto.xyz/utils'

export interface Env {
  BUCKET: R2Bucket
  GOOGLE_OAUTH_CLIENT_SECRET: string
  GOOGLE_OAUTH_CLIENT_ID: string
  GITHUB_OAUTH_CLIENT_SECRET: string
  GITHUB_OAUTH_CLIENT_ID: string
}

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Methods': 'GET,HEAD,PUT,POST,OPTIONS',
//   'Access-Control-Max-Age': '86400',
// }

// async function handleOptions(request: Request) {
//   if (
//     request.headers.get('Origin') !== null &&
//     request.headers.get('Access-Control-Request-Method') !== null &&
//     request.headers.get('Access-Control-Request-Headers') !== null
//   ) {
//     // Handle CORS preflight requests.
//     return new Response(null, {
//       status: 200,
//       headers: {
//         ...corsHeaders,
//         'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '',
//       },
//     })
//   } else {
//     // Handle standard OPTIONS request.
//     return new Response(null, {
//       status: 204,
//       headers: {
//         ...corsHeaders,
//         Allow: 'GET, HEAD, POST, OPTIONS',
//         'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '',
//       },
//     })
//   }
// }

async function handleCommentRequest(path: string[], request: Request, env: Env) {
  const key = `${path[1]}/comments`
  switch (request.method) {
    case 'OPTIONS':
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          // 'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    case 'POST':
      const body = await request.json<CreateCommentRequest>()
      const old = await env.BUCKET.get(key)
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
      await env.BUCKET.put(key, JSON.stringify(json))
      return new Response(`Put ${key} successfully!`, {
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
      const result = await env.BUCKET.get(key)
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
}

/**
 * Based on https://github.com/gr2m/cloudflare-worker-github-oauth-login
 *
 * @param path
 * @param request
 * @param env
 * @returns
 */
async function handleGithubOauth(url: URL, path: string[], request: Request, env: Env) {
  const client_id = env.GITHUB_OAUTH_CLIENT_ID
  const client_secret = env.GITHUB_OAUTH_CLIENT_SECRET
  if (path[2] === 'login' && request.method === 'GET') {
    // const red = url.searchParams.get('redirect_uri')

    return Response.redirect(
      `https://github.com/login/oauth/authorize?client_id=${client_id}&${url.search.slice(1)}`,
      302
    )
    // } else if (path[2] === 'hook' && request.method === 'GET') {
    //   const red = url.searchParams.get('redirect_uri')
    //   if (red) {
    //     return Response.redirect(red, 301)
    //   }
  } else if (path[2] === 'callback' && request.method === 'GET') {
    const uri = url.searchParams.get('redirect_uri')
    const location = url.searchParams.get('location')
    if (uri) {
      return Response.redirect(`${uri}?location=${location}`, 301)
    }
    // if (uri?.includes('localhost')) {
    //   return Response.redirect(`http://localhost:5173/auth/github${url.search}`, 301)
    // } else {
    //   return Response.redirect(`https://teemukoivisto-site.pages.dev/${url.search}`, 301)
    // }
  } else if (path[2] === 'token' && request.method === 'POST') {
    const { code } = await request.json<{ code: string }>()

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'cloudflare-worker-github-oauth-login-demo',
        accept: 'application/json',
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    })
    const result = await response.json<{ access_token?: string; error?: string }>()
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
    if (result.error) {
      return new Response(JSON.stringify(result), { status: 401, headers })
    }

    return new Response(JSON.stringify({ token: result.access_token }), {
      status: 201,
      headers,
    })
  } else if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }
  return new Response(null, {
    status: 404,
  })
}

async function handleOauth(
  path: string[],
  url: URL,
  request: Request,
  env: Env
): Promise<Response | undefined> {
  // const client = new Auth.OAuth2Client(
  //   config.GOOGLE.CLIENT_ID,
  //   config.GOOGLE.CLIENT_SECRET,
  //   'http://localhost:5274/callback'
  // )
  // const client = driveService.createClient({
  //   access_token: token,
  //   scope: 'https://www.googleapis.com/auth/drive.readonly',
  //   token_type: 'Bearer'
  // })
  switch (path[1]) {
    case 'google':

    case 'github':
      return handleGithubOauth(url, path, request, env)
    default:
      return new Response(null, {
        status: 404,
      })
  }
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url)
    const path = url.pathname.slice(1).split('/')

    switch (path[0]) {
      case 'comment':
        return handleCommentRequest(path, request, env)
      case 'oauth':
        return handleOauth(path, url, request, env)
      default:
        return new Response(null, {
          status: 404,
        })
    }
  },
}
