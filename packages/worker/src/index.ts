import { handleGithubOauth } from './github'

import type { CommentObject, CreateCommentRequest } from '@teemukoivisto.xyz/utils'

export interface Env {
  BUCKET: R2Bucket
  authorized_users: KVNamespace
  GOOGLE_OAUTH_CLIENT_SECRET: string
  GOOGLE_OAUTH_CLIENT_ID: string
  GITHUB_OAUTH_CLIENT_SECRET: string
  GITHUB_OAUTH_CLIENT_ID: string
}

const isString = (v: any) => typeof v === 'string'

function validateCreatePayload(json: any): CreateCommentRequest | undefined {
  const obj = {
    profile_id: json.profile_id,
    avatar_url: json.avatar_url,
    author: json.author,
    origin: json.origin,
    body: json.body,
  }
  const valid = Object.entries(obj).every(([key, val]) => {
    if (key === 'origin') {
      return val === 'github' || val === 'google' || val === 'anon'
    } else if (key === 'body') {
      return isString(val) && val.length < 1024
    }
    return isString(val) && val.length < 100
  })
  if (!valid) {
    return undefined
  }
  return obj
}

async function handleCommentRequest(path: string[], request: Request, env: Env) {
  const key = `${path[1]}/comments`
  switch (request.method) {
    case 'OPTIONS':
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    case 'PUT':
      // const update = await request.json<any>()
      return new Response(`Edited ${key} successfully!`, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
    case 'POST':
      const body = validateCreatePayload(await request.json<any>())
      if (!body) {
        return new Response(null, {
          status: 400,
        })
      }
      const old = await env.BUCKET.get(key)
      let json: CommentObject = {
        comments: [],
      }
      if (old) {
        json = await old.json()
      }
      json.comments.push({
        ...body,
        id: Date.now().toString(),
        created_at: Date.now(),
      })
      await env.BUCKET.put(key, JSON.stringify(json))
      return new Response(`Put ${key} successfully!`, {
        status: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
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
