import Joi from 'joi'
import type { ObjectSchema } from 'joi'

export const IMAGE_SCHEMA = Joi.object({
  src: Joi.string().required(),
  alt: Joi.string().required(),
})

export const SIBLING_POST = Joi.object({
  slug: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  datePublished: Joi.string().required(),
  dateModified: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  coverImage: IMAGE_SCHEMA,
  squareImg: IMAGE_SCHEMA,
  cardImg: IMAGE_SCHEMA,
})

export const BLOG_POST_SCHEMA = Joi.object({
  slug: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  datePublished: Joi.string().required(),
  dateModified: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  nextPost: SIBLING_POST,
  prevPost: SIBLING_POST,
  coverImage: IMAGE_SCHEMA,
  squareImg: IMAGE_SCHEMA,
  cardImg: IMAGE_SCHEMA,
  html: Joi.string().allow(''),
})

export function validate<T>(schema: ObjectSchema, data: unknown): T {
  const result = schema.strict().validate(data)
  if (result.error) {
    throw Error(result.error.message || 'Validate received invalid data')
  }
  return result.value as T
}
