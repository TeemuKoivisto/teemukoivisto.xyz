export interface CommentObject {
  comments: Comment[]
}
export interface Comment {
  id: string
  avatar_url?: string
  author: string
  body: string
  created_at: number
  metadata: any
}
// GET /:slug/comments
export interface ListCommentsResponse {
  comments: Comment[]
}

// POST /:slug/comment
export interface CreateCommentRequest {
  id: string
  avatar_url?: string
  author: string
  body: string
}
export type CreateCommentResponse = Comment

// PUT /:slug/comment
export type UpdateCommentRequest = {
  body: string
}
