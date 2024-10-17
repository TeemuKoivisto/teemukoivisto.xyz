import { get, derived, writable } from 'svelte/store'

import * as commentApi from '$lib/api/comments'

import { persist } from './persist'

import type { Comment } from '@teemukoivisto.xyz/lib'

export const commentMap = persist(writable<Map<string, Comment[]>>(new Map<string, Comment[]>()), {
  key: 'comment-map',
  serialize: val => {
    return Array.from(val.entries()).map(([key, val]) => [key, val] as [string, Comment[]])
  },
  deserialize: val => {
    return new Map(val.map(([key, val]) => [key, val]))
  },
})

export const commentActions = {
  async list(slug: string) {
    const resp = await commentApi.listComments(slug)
    if ('data' in resp) {
      commentMap.update(m => m.set(slug, resp.data.comments))
    } else {
      console.error(resp)
    }
    return resp
  },
  async create(slug: string, body: string) {
    const resp = await commentApi.saveComment(slug, {
      body,
    })
    if ('data' in resp) {
      commentMap.update(m => m.set(slug, [...(m.get(slug) || []), resp.data]))
    }
    return resp
  },
  async update(slug: string, id: string, body: string) {
    const resp = await commentApi.updateComment(slug, id, {
      body,
    })
    if ('data' in resp) {
      commentMap.update(m =>
        m.set(
          slug,
          (m.get(slug) || []).map(c => (c.id === id ? { ...c, body } : c))
        )
      )
    }
    return resp
  },
  async delete(slug: string, id: string) {
    const resp = await commentApi.deleteComment(slug, id)
    if ('data' in resp) {
      commentMap.update(m =>
        m.set(
          slug,
          (m.get(slug) || []).filter(c => c.id !== id)
        )
      )
    }
    return resp
  },
}
