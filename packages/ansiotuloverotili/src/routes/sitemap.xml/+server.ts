import * as sitemap from 'super-sitemap'
import type { RequestHandler } from '@sveltejs/kit'

import { SITE_METADATA } from '$config'

export const GET: RequestHandler = async () => {
  return await sitemap.response({
    origin: SITE_METADATA.url,
  })
}
