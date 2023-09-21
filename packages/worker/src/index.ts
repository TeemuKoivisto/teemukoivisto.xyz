import { handleGithubOauth } from './github'

import type {
  CommentObject,
  CreateCommentRequest,
  UpdateCommentRequest,
} from '@teemukoivisto.xyz/utils'

import { corsHeaders, corsResponse } from './cors'

export interface Env {
  BUCKET: R2Bucket
  authorized_users: KVNamespace
  GOOGLE_OAUTH_CLIENT_SECRET: string
  GOOGLE_OAUTH_CLIENT_ID: string
  GITHUB_OAUTH_CLIENT_SECRET: string
  GITHUB_OAUTH_CLIENT_ID: string
}

const isString = (v: any) => typeof v === 'string'

function validateEditPayload(json: any): UpdateCommentRequest | undefined {
  const obj = {
    body: json.body,
  }
  if (!isString(obj.body) || obj.body.length >= 1024) {
    return undefined
  }
  return obj
}

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
      return corsResponse
    case 'PUT':
      const put = await Promise.all([
        request.json<any>(),
        env.authorized_users.get(request.headers.get('authorization') || 'null'),
      ])
      const putPayload = validateEditPayload(put[0])
      if (!putPayload) {
        return new Response('Invalid payload', {
          status: 400,
          headers: corsHeaders,
        })
      } else if (!put[1]) {
        return new Response('Invalid auth token', {
          status: 403,
          headers: corsHeaders,
        })
      }
      const old2 = await env.BUCKET.get(key)
      let json2: CommentObject = {
        comments: [],
      }
      if (old2) {
        json2 = await old2.json()
      }
      // json2.comments.push({
      //   ...putPayload,
      //   id: Date.now().toString(),
      //   created_at: Date.now(),
      // })
      await env.BUCKET.put(key, JSON.stringify(json2))
      // const update = await request.json<any>()
      return new Response(`Edited ${key} successfully!`, {
        status: 200,
        headers: corsHeaders,
      })
    case 'POST':
      const post = await Promise.all([
        request.json<any>(),
        env.authorized_users.get(request.headers.get('authorization') || 'null'),
      ])
      const body = validateCreatePayload(post[0])
      if (!body) {
        return new Response('Invalid payload', {
          status: 400,
          headers: corsHeaders,
        })
      } else if (!post[1]) {
        return new Response('Invalid auth token', {
          status: 403,
          headers: corsHeaders,
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
        headers: corsHeaders,
      })
    case 'GET':
      const result = await env.BUCKET.get(key)
      const fetched = result && (await result.json<CommentObject>())
      if (!fetched) {
        return new Response(null, {
          status: 404,
          headers: corsHeaders,
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
