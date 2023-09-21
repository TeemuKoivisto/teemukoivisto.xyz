import type { Endpoints } from '@octokit/types'

export type GitHubUserData = Endpoints['GET /user']['response']['data']
export interface AuthorizedUser {
  id: string
  avatar_url: string
  author: string
  origin: 'github' | 'google' | 'anon'
}

export interface Credentials {
  user_id: string
  token: string
}

// GET /oauth/github/authorize`
export interface AuthorizeGitHub {
  user: GitHubUserData
  credentials: Credentials
}
