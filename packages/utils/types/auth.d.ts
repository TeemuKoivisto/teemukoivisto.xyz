import type { Endpoints } from '@octokit/types'

export type GitHubUserData = Endpoints['GET /user']['response']['data']

export interface Credentials {
  user_id: string
  token: string
}

// GET /oauth/github/authorize`
export interface AuthorizeGitHub {
  user: GitHubUserData
  credentials: Credentials
}
