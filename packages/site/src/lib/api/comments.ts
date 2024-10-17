import type {
  ListCommentsResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  UpdateCommentRequest,
} from '@teemukoivisto.xyz/lib'

import { get, post, put, del } from './methods'

export const listComments = (slug: string) =>
  get<ListCommentsResponse>(`comments/${slug}`, 'Listing comments failed')

export const saveComment = (slug: string, payload: CreateCommentRequest) =>
  post<CreateCommentResponse>(`comments/${slug}`, payload, 'Saving comment failed')

export const updateComment = (slug: string, commentId: string, payload: UpdateCommentRequest) =>
  put<boolean>(`comments/${slug}?commentId=${commentId}`, payload, 'Updating comment failed')

export const deleteComment = (slug: string, commentId: string) =>
  del<boolean>(`comments/${slug}?commentId=${commentId}`, 'Deleting comment failed')
