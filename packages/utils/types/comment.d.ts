import type { Endpoints } from '@octokit/types'

export type GitHubUserData = Endpoints['GET /user']['response']['data']

export interface CommentObject {
  comments: Comment[]
}
export interface Comment {
  id: string
  profile_id: string
  avatar_url: string
  author: string
  origin: 'github' | 'google' | 'anon'
  body: string
  created_at: number
}
// GET /:slug/comments
export interface ListCommentsResponse {
  comments: Comment[]
}

// POST /:slug/comment
export interface CreateCommentRequest {
  body: string
}
export type CreateCommentResponse = Comment

// PUT /:slug/comment
export type UpdateCommentRequest = {
  id: string
  body: string
}
