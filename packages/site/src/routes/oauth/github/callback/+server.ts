import { error } from '@sveltejs/kit'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = async event => {
  const uri = event.url.searchParams.get('redirect_uri')
  const location = event.url.searchParams.get('location')
  if (uri) {
    return Response.redirect(`${uri}?location=${location}`, 301)
  }
  return error(404, 'No redirect_uri in search params')
}
