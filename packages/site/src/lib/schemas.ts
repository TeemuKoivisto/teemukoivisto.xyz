import { DateTime } from 'luxon'
import * as z from 'zod'

const zDateTime = z.string().transform((val, ctx) => {
  const dt = DateTime.fromISO(val)
  if (!dt.isValid) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a valid ISO timestamp',
    })
    return z.NEVER
  }
  return dt
})

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

export const BLOG_IMAGE = z.object({
  url: z.string(),
  alt: z.string(),
  width: z.number().int(),
  height: z.number().int(),
})

export const SIBLING_POST_RAW = z.object({
  slug: z.string(),
  url: z.string().url(),
  title: z.string(),
  description: z.string(),
  datePublished: z.string(),
  dateModified: z.string(),
  tags: z.array(z.string()),
  coverImage: BLOG_IMAGE,
  squareImg: BLOG_IMAGE,
  cardImg: BLOG_IMAGE,
})
export const SIBLING_POST = SIBLING_POST_RAW.extend({
  datePublished: zDateTime,
  dateModified: zDateTime,
})

export const BLOG_POST_RAW = z.object({
  draft: z.boolean().default(false),
  slug: z.string(),
  url: z.string().url(),
  title: z.string(),
  description: z.string(),
  datePublished: z.string(),
  dateModified: z.string(),
  tags: z.array(z.string()),
  coverImage: BLOG_IMAGE.optional(),
  squareImg: BLOG_IMAGE.optional(),
  cardImg: BLOG_IMAGE.optional(),
  nextPost: SIBLING_POST.optional(),
  prevPost: SIBLING_POST.optional(),
  html: z.string(),
})
export type BlogPost = z.infer<typeof BLOG_POST>
export const BLOG_POST = BLOG_POST_RAW.omit({
  datePublished: true,
  dateModified: true,
}).extend({
  datePublished: zDateTime,
  dateModified: zDateTime,
})
