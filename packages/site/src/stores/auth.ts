import { goto } from '$app/navigation'
import { derived, get, writable } from 'svelte/store'

import { persist } from './persist'

import { wrappedFetch } from '@teemukoivisto.xyz/lib'
import type { AuthorizeGitHub, Credentials, GitHubUserData, Result } from '@teemukoivisto.xyz/lib'

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
  async callback(): Promise<Result<AuthorizeGitHub>> {
    const url = new URL(location.href)
    const code = url.searchParams.get('code')
    const redirect = url.searchParams.get('redirect')
    goto(redirect ? redirect + '#comments' : '/')
    if (!code || !redirect) {
      return { err: `No code or redirect found ${redirect} ${code}`, code: 400 }
    }
    // const resp = await authApi.authGithub({ code })
    const resp = await wrappedFetch<AuthorizeGitHub>('/oauth/github/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
    if ('data' in resp) {
      githubUser.set(resp.data.user)
      credentials.set(resp.data.credentials)
    }
    return resp
  },
}
