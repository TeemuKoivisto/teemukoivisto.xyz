import { handleCommentRequest } from './routes/comment'
import { handleOauth } from './routes/oauth'

import { corsHeaders } from './cors'
import { Env } from './types'

export default {
  fetch(request: Request, env: Env) {
    const url = new URL(request.url)
    const path = url.pathname.slice(1).split('/')
    switch (path[0]) {
      case 'comment':
        return handleCommentRequest(path, request, env)
      case 'oauth':
        return handleOauth(path, url, request, env)
      default:
        return new Response(null, {
          status: 404,
          headers: corsHeaders,
        })
    }
  },
}
