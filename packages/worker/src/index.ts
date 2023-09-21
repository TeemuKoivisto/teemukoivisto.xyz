import { handleGithubOauth } from './github'

import type {
  AuthorizedUser,
  Comment,
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

function validateUpdatePayload(json: any): UpdateCommentRequest | undefined {
  const obj = {
    id: json.id,
    body: json.body,
  }
  if (!isString(obj.id) || obj.id.length >= 100) {
    return undefined
  } else if (!isString(obj.body) || obj.body.length >= 1024) {
    return undefined
  }
  return obj
}

function validateCreatePayload(json: any): CreateCommentRequest | undefined {
  const obj = {
    body: json.body,
  }
  if (!isString(obj.body) || obj.body.length >= 1024) {
    return undefined
  }
  return obj
}

function createComment(body: string, user: AuthorizedUser): Comment {
  return {
    id: Date.now().toString(),
    created_at: Date.now(),
    body,
    profile_id: user.id,
    avatar_url: user.avatar_url,
    author: user.author,
    origin: 'github',
  }
}

interface Validated {}

async function validate(type: 'update' | 'create', request: Request, env: Env) {
  const payload = await Promise.all([
    request.json<any>(),
    env.authorized_users.get(request.headers.get('authorization') || 'null'),
  ])
  const result =
    type === 'update' ? validateUpdatePayload(payload[0]) : validateCreatePayload(payload[1])
  if (!result) {
    return new Response(`Invalid ${type} payload`, {
      status: 400,
      headers: corsHeaders,
    })
  } else if (!payload[1]) {
    return new Response('Invalid auth token', {
      status: 403,
      headers: corsHeaders,
    })
  }
  const user = JSON.parse(payload[1]) as AuthorizedUser
  return {
    body: result,
    user,
  }
}

async function handleCommentRequest(path: string[], request: Request, env: Env) {
  const key = `${path[1]}/comments`
  if (request.method === 'OPTIONS') {
    return corsResponse
  } else if (request.method === 'PUT') {
    const put = await Promise.all([
      request.json<any>(),
      env.authorized_users.get(request.headers.get('authorization') || 'null'),
    ])
    const putPayload = validateUpdatePayload(put[0])
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
    const user = JSON.parse(put[1]) as AuthorizedUser

    const old = await env.BUCKET.get(key)
    const json = await old?.json<CommentObject>()
    if (!json) {
      return new Response(null, {
        status: 404,
      })
    }
    json.comments = json.comments.map(c => {
      if (c.id === putPayload.id && c.profile_id === user.id) {
        return { ...c, body: putPayload.body }
      }
      return c
    })
    await env.BUCKET.put(key, JSON.stringify(json))
    return new Response(`Edited ${key} successfully!`, {
      status: 200,
      headers: corsHeaders,
    })
  } else if (request.method === 'POST') {
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
    const user = JSON.parse(post[1]) as AuthorizedUser
    const old = await env.BUCKET.get(key)
    let json: CommentObject = {
      comments: [],
    }
    if (old) {
      json = await old.json()
    }
    const comment = createComment(body.body, user)
    json.comments.push(comment)
    await env.BUCKET.put(key, JSON.stringify(json))
    return new Response(JSON.stringify(comment), {
      status: 201,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
  } else if (request.method === 'GET') {
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
  } else if (request.method === 'DELETE') {
    return new Response(null, {
      status: 501,
    })
  } else {
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
