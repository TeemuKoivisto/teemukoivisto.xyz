import { error } from '@sveltejs/kit'

import type { AuthorizedUser, Comment, CommentObject } from '@teemukoivisto.xyz/lib'
import type { RequestHandler } from './$types'
import { z } from 'zod'
import { zodError } from '$lib/error'

export const GET: RequestHandler = async event => {
  if (!event.platform) {
    return error(500, 'No event.platform defined')
  }
  const { env } = event.platform
  const found = (await (await env.BUCKET.get(event.params.slug))?.json<CommentObject>()) || {
    comments: [],
  }
  // const headers = new Headers()
  // json.writeHttpMetadata(headers)
  // headers.set('etag', json.httpEtag)
  return new Response(JSON.stringify(found), {
    headers: {
      'Cache-Control': 'public, max-age=300',
      'Content-Type': 'application/json',
    },
  })
}

export const PUT: RequestHandler = async event => {
  if (!event.platform) {
    return error(500, 'No event.platform defined')
  }
  const { env } = event.platform
  const commentId = event.url.searchParams.get('commentId')
  if (commentId === null || commentId.length < 10) {
    return error(400, 'Invalid commentId')
  }
  const body = COMMENT_CREATE.safeParse(await event.request.json())
  if (!body.success) {
    return zodError(body.error)
  }
  const authToken = event.request.headers.get('authorization')
  const found = await env.authorized_users.get(authToken || '')
  if (!found) {
    return error(403, 'Session expired — please re-login')
  }
  const user = JSON.parse(found)
  const post = (await (await env.BUCKET.get(event.params.slug))?.json<CommentObject>()) || {
    comments: [],
  }
  if (!post) {
    return error(404, 'No post found')
  }
  post.comments = post.comments.map(c => {
    if (c.id === commentId && (c.profile_id === user.id || user.id === env.SUPER_USER_ID)) {
      return { ...c, body: body.data.body }
    }
    return c
  })
  await env.BUCKET.put(event.params.slug, JSON.stringify(post))
  return new Response(null, {
    status: 204,
  })
}

const COMMENT_CREATE = z.object({
  body: z.string().min(3).max(1024),
})

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

export const POST: RequestHandler = async event => {
  if (!event.platform) {
    return error(500, 'No event.platform defined')
  }
  const { env } = event.platform
  const body = COMMENT_CREATE.safeParse(await event.request.json())
  if (!body.success) {
    return zodError(body.error)
  }
  const authToken = event.request.headers.get('authorization')
  const found = await env.authorized_users.get(authToken || '')
  if (!found) {
    return error(403, 'Session expired — please re-login')
  }
  const user = JSON.parse(found)
  const post = (await (await env.BUCKET.get(event.params.slug))?.json<CommentObject>()) || {
    comments: [],
  }
  post.comments.push({
    id: Date.now().toString(),
    created_at: Date.now(),
    body: body.data.body,
    profile_id: user.id,
    avatar_url: user.avatar_url,
    author: user.author,
    origin: 'github',
  })
  await env.BUCKET.put(event.params.slug, JSON.stringify(post))
  return new Response(JSON.stringify(post.comments.pop()), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const DELETE: RequestHandler = async event => {
  if (!event.platform) {
    return error(500, 'No event.platform defined')
  }
  const { env } = event.platform
  const commentId = event.url.searchParams.get('commentId')
  if (commentId === null || commentId.length < 10) {
    return error(400, 'Invalid commentId')
  }
  const authToken = event.request.headers.get('authorization')
  const found = await env.authorized_users.get(authToken || '')
  if (!found) {
    return error(403, 'Session expired — please re-login')
  }
  const user = JSON.parse(found) as AuthorizedUser
  const post = await (await env.BUCKET.get(event.params.slug))?.json<CommentObject>()
  if (!post) {
    return error(404, 'No post found')
  }
  post.comments = post.comments.filter(
    c => c.id !== commentId || (c.profile_id !== user.id && user.id !== env.SUPER_USER_ID)
  )
  await env.BUCKET.put(event.params.slug, JSON.stringify(post))
  return new Response(null, {
    status: 204,
  })
}
