import { derived, get, writable } from 'svelte/store'
import type { Endpoints } from '@octokit/types'

import { persist } from './persist'

import { wrappedFetch } from '@teemukoivisto.xyz/utils'
import type { Result } from '@teemukoivisto.xyz/utils'

import { COMMENT_API_URL } from '$config'

type GetUserData = Endpoints['GET /user']['response']['data']

export const githubUser = persist(writable<GetUserData | null>(null), 'github-user')
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
  async callback(): Promise<Result<string>> {
    const url = new URL(location.href)
    const origin = get(locationOrigin)
    const code = url.searchParams.get('code')
    const path = location.pathname + location.search.replace(/\bcode=\w+/, '').replace(/\?$/, '')
    history.pushState({}, '', path)
    if (!code || !origin) {
      return { err: `No code or origin found ${origin} ${code}`, code: 400 }
    }
    const resp = await wrappedFetch<{ token: string }>(`${COMMENT_API_URL}/oauth/github/token`, {
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
    const getUserResponse = await wrappedFetch<GetUserData>('https://api.github.com/user', {
      headers: {
        accept: 'application/vnd.github.v3+json',
        authorization: `token ${resp.data.token}`,
      },
    })
    if ('err' in getUserResponse) {
      return getUserResponse
    }
    githubUser.set(getUserResponse.data)
    locationOrigin.set('')
    return { data: origin }
  },
}
