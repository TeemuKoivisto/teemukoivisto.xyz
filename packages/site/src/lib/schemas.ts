import * as z from 'zod'

export const USER = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.union([z.coerce.date(), z.null()]),
  image: z.union([z.string(), z.null()]),
  created_at: z.coerce.date(),
  // updated_at: z.coerce.date(),
})

export const AUTH_RESP = z.object({
  user: z.record(z.string(), z.any()),
  credentials: z.object({
    user_id: z.string(),
    sudo: z.boolean(),
    token: z.string(),
    expires: z.number().int(),
  }),
})

export type Comment = z.infer<typeof COMMENT>
export type CommentRaw = z.infer<typeof COMMENT_RAW>
export const COMMENT = z.object({
  id: z.string(),
  body: z.string(),
  profile_id: z.string(),
  avatar_url: z.string(),
  author: z.string(),
  origin: z.union([z.literal('github'), z.literal('google')]),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export const COMMENT_RAW = COMMENT.omit({ created_at: true, updated_at: true }).extend({
  created_at: z.number().int(),
  updated_at: z.number().int(),
})

export const COMMENT_LIST = z.object({
  comments: z.array(COMMENT),
})
export const COMMENT_CREATE = z.object({
  body: z.string().min(1).max(1024),
})
