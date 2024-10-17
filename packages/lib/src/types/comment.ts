import type { Endpoints } from '@octokit/types'

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
// GET /comments/:slug
export interface ListCommentsResponse {
  comments: Comment[]
}

// POST /comment/:slug
export interface CreateCommentRequest {
  body: string
}
export type CreateCommentResponse = Comment

// PUT /comment/:slug/:commentId
export interface UpdateCommentRequest {
  body: string
}

// DELETE /comment/:slug/:commentId
