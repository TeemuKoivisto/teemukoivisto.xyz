import { get, derived, writable } from 'svelte/store'
import { z } from 'zod'

import { persist } from './persist'
import { commentsApi } from '$lib/request'
import { COMMENT } from '$lib/schemas'

import type { Comment } from '$lib/schemas'

export const commentsMap = persist(writable<Map<string, Comment[]>>(new Map<string, Comment[]>()), {
  key: 'comments-map',
  serialize: val => Array.from(val.entries()).map(([k, v]) => [k, v] as [string, any]),
  deserialize: val => new Map(val.map(([k, v]) => [k, z.array(COMMENT).parse(v)])),
})

export const commentActions = {
  async list(slug: string) {
    const resp = await commentsApi.list(slug)
    if ('data' in resp) {
      commentsMap.update(m => m.set(slug, resp.data.comments))
    } else {
      console.error(resp)
    }
    return resp
  },
  async create(slug: string, body: string) {
    const resp = await commentsApi.create(slug, {
      body,
    })
    if ('data' in resp) {
      commentsMap.update(m => m.set(slug, [...(m.get(slug) || []), resp.data]))
    }
    return resp
  },
  async update(slug: string, id: string, body: string) {
    const resp = await commentsApi.update(slug, id, {
      body,
    })
    if ('data' in resp) {
      commentsMap.update(m =>
        m.set(
          slug,
          (m.get(slug) || []).map(c => (c.id === id ? { ...c, body } : c))
        )
      )
    }
    return resp
  },
  async delete(slug: string, id: string) {
    const resp = await commentsApi.delete(slug, id)
    if ('data' in resp) {
      commentsMap.update(m =>
        m.set(
          slug,
          (m.get(slug) || []).filter(c => c.id !== id)
        )
      )
    }
    return resp
  },
}
