import { handleGithubOauth } from './github'

import type {
  AuthorizedUser,
  Comment,
  CommentObject,
  CreateCommentRequest,
  Result,
  UpdateCommentRequest,
} from '@teemukoivisto.xyz/utils'

import { corsHeaders, corsResponse } from './cors'
import { Env } from './types'

const isString = (v: any) => typeof v === 'string'

async function validateJsonAndAuth<T>(
  request: Request,
  env: Env,
  fn: (values: any) => T | undefined
): Promise<Result<{ result: T; user: AuthorizedUser }>> {
  const payload = await Promise.all([
    request.json<any>(),
    env.authorized_users.get(request.headers.get('authorization') || 'null'),
  ])
  const result = fn(payload[0])
  if (!result) {
    return {
      err: 'Payload failed validation',
      code: 400,
    }
  } else if (!payload[1]) {
    return {
      err: 'Auth token expired - please re-login',
      code: 403,
    }
  }
  const user = JSON.parse(payload[1]) as AuthorizedUser
  return {
    data: {
      result,
      user,
    },
  }
}

function validateUpdatePayload(json: any, commentId: string): UpdateCommentRequest | undefined {
  const obj = {
    id: commentId,
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

async function handleCommentRequest(path: string[], request: Request, env: Env) {
  const key = `${path[1]}/comments`
  if (request.method === 'OPTIONS') {
    return corsResponse
  } else if (request.method === 'PUT') {
    const commentId = path[2]
    const valid = await validateJsonAndAuth(request, env, j => validateUpdatePayload(j, commentId))
    if ('err' in valid) {
      return new Response(valid.err, {
        status: valid.code,
        headers: corsHeaders,
      })
    }
    const old = await env.BUCKET.get(key)
    const json = await old?.json<CommentObject>()
    if (!json) {
      return new Response(null, {
        status: 404,
        headers: corsHeaders,
      })
    }
    const userId = valid.data.user.id
    json.comments = json.comments.map(c => {
      if (c.id === commentId && (c.profile_id === userId || userId === env.SUPER_USER_ID)) {
        return { ...c, body: valid.data.result.body }
      }
      return c
    })
    await env.BUCKET.put(key, JSON.stringify(json))
    return new Response(`Edited ${key} successfully!`, {
      status: 200,
      headers: corsHeaders,
    })
  } else if (request.method === 'POST') {
    const valid = await validateJsonAndAuth(request, env, validateCreatePayload)
    if ('err' in valid) {
      return new Response(valid.err, {
        status: valid.code,
        headers: corsHeaders,
      })
    }
    const old = await env.BUCKET.get(key)
    const json: CommentObject = old
      ? await old.json()
      : {
          comments: [],
        }
    const comment = createComment(valid.data.result.body, valid.data.user)
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
    const json = fetched ?? { comments: [] }
    // const headers = new Headers()
    // json.writeHttpMetadata(headers)
    // headers.set('etag', json.httpEtag)
    return new Response(JSON.stringify(json), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
  } else if (request.method === 'DELETE') {
    const commentId = path[2]
    const auth = await env.authorized_users.get(request.headers.get('authorization') || 'null')
    if (!isString(commentId) || commentId.length < 10) {
      return new Response('Invalid comment id', {
        status: 400,
        headers: corsHeaders,
      })
    } else if (!auth) {
      return new Response('Invalid auth token', {
        status: 403,
        headers: corsHeaders,
      })
    }
    const user = JSON.parse(auth) as AuthorizedUser
    const old = await env.BUCKET.get(key)
    const json = await old?.json<CommentObject>()
    if (!json) {
      return new Response(null, {
        status: 404,
        headers: corsHeaders,
      })
    }
    json.comments = json.comments.filter(
      c => c.id !== commentId || (c.profile_id !== user.id && user.id !== env.SUPER_USER_ID)
    )
    await env.BUCKET.put(key, JSON.stringify(json))
    return new Response(commentId, {
      status: 200,
      headers: corsHeaders,
    })
  } else {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: {
        ...corsHeaders,
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
      return new Response(null, {
        status: 404,
        headers: corsHeaders,
      })
    case 'github':
      return handleGithubOauth(url, path, request, env)
    default:
      return new Response(null, {
        status: 404,
        headers: corsHeaders,
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
          headers: corsHeaders,
        })
    }
  },
}
