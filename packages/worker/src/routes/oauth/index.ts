import { handleGithubOauth } from './github'

import { corsHeaders, corsResponse } from '../../cors'
import { Env } from '../../types'

export async function handleOauth(
  path: string[],
  url: URL,
  request: Request,
  env: Env
): Promise<Response | undefined> {
  // const client = new Auth.OAuth2Client(
  //   config.GOOGLE.CLIENT_ID,
  //   config.GOOGLE.CLIENT_SECRET,
  //   'http://localhost:5274/callback'
  // )
  // const client = driveService.createClient({
  //   access_token: token,
  //   scope: 'https://www.googleapis.com/auth/drive.readonly',
  //   token_type: 'Bearer'
  // })
  switch (path[1]) {
    case 'google':
      return new Response(null, {
        status: 404,
        headers: corsHeaders,
      })
    case 'github':
      return handleGithubOauth(url, path, request, env)
    default:
      return new Response(null, {
        status: 404,
        headers: corsHeaders,
      })
  }
}
