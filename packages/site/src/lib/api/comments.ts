import type {
  ListCommentsResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  UpdateCommentRequest,
} from '@teemukoivisto.xyz/utils'

import { get, post, put, del } from './methods'

export const listComments = (slug: string) =>
  get<ListCommentsResponse>(`${slug}`, 'Listing comments failed')

export const saveComment = (slug: string, payload: CreateCommentRequest) =>
  post<CreateCommentResponse>(`${slug}`, payload, 'Saving comment failed')

export const updateComment = (slug: string, commentId: string, payload: UpdateCommentRequest) =>
  put<boolean>(`${slug}/comment/${commentId}`, payload, 'Updating comment failed')

export const deleteComment = (slug: string, commentId: string) =>
  del<boolean>(`${slug}/comment/${commentId}`, 'Deleting comment failed')
