import { goto } from '$app/navigation'
import { derived, get, writable } from 'svelte/store'

import { persist } from './persist'

import type { Credentials, GitHubUserData } from '@teemukoivisto.xyz/lib'
import { authApi } from '$lib/request'

export const githubUser = persist(writable<GitHubUserData | null>(null), {
  key: 'github-user',
})
export const credentials = persist(writable<Credentials | null>(null), {
  key: 'credentials',
})

credentials.subscribe(c => {
  if (c && c.expires > Date.now()) {
    setTimeout(() => {
      // Just to make sure credentials havent changed
      if (Date.now() > c.expires) {
        githubActions.logout()
      }
    }, Date.now() - c.expires)
  }
})

export const githubActions = {
  logout() {
    githubUser.set(null)
    credentials.set(null)
  },
  async callback(): ReturnType<typeof authApi.authGithub> {
    const url = new URL(location.href)
    const code = url.searchParams.get('code')
    const redirect = url.searchParams.get('redirect')
    goto(redirect ? redirect + '#comments' : '/')
    if (!code || !redirect) {
      return { err: `No code or redirect found ${redirect} ${code}`, code: 400 }
    }
    const resp = await authApi.authGithub({ code })
    if ('data' in resp) {
      githubUser.set(resp.data.user as GitHubUserData)
      credentials.set(resp.data.credentials)
    }
    return resp
  },
}
