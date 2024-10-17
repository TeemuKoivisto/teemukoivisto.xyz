import type {
  ListCommentsResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  UpdateCommentRequest,
} from '@teemukoivisto.xyz/lib'

import { get, post, put, del } from './methods'

export const listComments = (slug: string) =>
  get<ListCommentsResponse>(`comment/${slug}`, 'Listing comments failed')

export const saveComment = (slug: string, payload: CreateCommentRequest) =>
  post<CreateCommentResponse>(`comment/${slug}`, payload, 'Saving comment failed')

export const updateComment = (slug: string, commentId: string, payload: UpdateCommentRequest) =>
  put<boolean>(`comment/${slug}/${commentId}`, payload, 'Updating comment failed')

export const deleteComment = (slug: string, commentId: string) =>
  del<boolean>(`comment/${slug}/${commentId}`, 'Deleting comment failed')
