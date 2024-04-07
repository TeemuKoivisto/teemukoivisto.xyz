import Joi from 'joi'
import type { ObjectSchema } from 'joi'

import type { BlogImage, BlogPost, SiblingPost } from './types'

export const IMAGE_SCHEMA = Joi.object<BlogImage>({
  url: Joi.string().required(),
  alt: Joi.string().required(),
  width: Joi.number(),
  height: Joi.number(),
})

export const SIBLING_POST = Joi.object<SiblingPost>({
  slug: Joi.string().required(),
  url: Joi.string().uri().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  datePublished: Joi.string().required(),
  dateModified: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  coverImage: IMAGE_SCHEMA,
  squareImg: IMAGE_SCHEMA,
  cardImg: IMAGE_SCHEMA,
})

export const BLOG_POST_SCHEMA = Joi.object<BlogPost>({
  draft: Joi.boolean().default(false),
  slug: Joi.string().required(),
  url: Joi.string().uri().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  datePublished: Joi.string().required(),
  dateModified: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  coverImage: IMAGE_SCHEMA,
  squareImg: IMAGE_SCHEMA,
  cardImg: IMAGE_SCHEMA,
  nextPost: SIBLING_POST,
  prevPost: SIBLING_POST,
  html: Joi.string().allow(''),
})

export function validate<T>(schema: ObjectSchema, data: unknown): T {
  const result = schema.strict().validate(data)
  if (result.error) {
    throw Error(result.error.message || 'Validate received invalid data')
  }
  return result.value as T
}
