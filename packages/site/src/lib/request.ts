import * as z from 'zod'

import * as schemas from './schemas'
import { get, patch, post, del } from './methods'

export const authApi = {
  authGithub: (body: { code: string }) =>
    post('oauth/github/authorize', body, schemas.AUTH_RESP.parse),
}

export const commentsApi = {
  list: (slug: string) => get(`comments/${slug}`, schemas.COMMENT_LIST.parse),
  create: (slug: string, body: z.infer<typeof schemas.COMMENT_CREATE>) =>
    post(`comments/${slug}`, body, schemas.COMMENT.parse),
  update: (slug: string, id: string, body: z.infer<typeof schemas.COMMENT_CREATE>) =>
    patch<null>(`comments/${slug}?commentId=${id}`, body),
  delete: (slug: string, id: string) => del<null>(`comments/${slug}?commentId=${id}`),
}
