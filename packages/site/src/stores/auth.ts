import { goto } from '$app/navigation'
import { derived, get, writable } from 'svelte/store'

import { persist } from './persist'

import { wrappedFetch } from '@teemukoivisto.xyz/utils'
import type { GitHubUserData, Result } from '@teemukoivisto.xyz/utils'

import { COMMENT_API_URL } from '$config'

export const githubUser = persist(writable<GitHubUserData | null>(null), 'github-user')
const locationOrigin = persist(writable<string>(''), 'location-origin')

export const githubActions = {
  login() {
    locationOrigin.set(location.href)
    window.location.replace(
      `${COMMENT_API_URL}/oauth/github/login?redirect_uri=${location.origin}/auth/github`
    )
  },
  logout() {
    locationOrigin.set('')
    githubUser.set(null)
  },
  async callback(): Promise<Result<undefined>> {
    const url = new URL(location.href)
    const origin = get(locationOrigin)
    const code = url.searchParams.get('code')
    goto(origin || '/')
    locationOrigin.set('')
    if (!code || !origin) {
      return { err: `No code or origin found ${origin} ${code}`, code: 400 }
    }
    const resp = await wrappedFetch<GitHubUserData>(`${COMMENT_API_URL}/oauth/github/authorize`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
    if ('err' in resp) {
      return resp
    }
    githubUser.set(resp.data)
    return { data: undefined }
  },
}
