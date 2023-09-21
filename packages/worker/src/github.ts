import type { GitHubUserData } from '@teemukoivisto.xyz/utils'

export interface Env {
  BUCKET: R2Bucket
  authorized_users: KVNamespace
  GOOGLE_OAUTH_CLIENT_SECRET: string
  GOOGLE_OAUTH_CLIENT_ID: string
  GITHUB_OAUTH_CLIENT_SECRET: string
  GITHUB_OAUTH_CLIENT_ID: string
}

/**
 * Based on https://github.com/gr2m/cloudflare-worker-github-oauth-login
 *
 * @param path
 * @param request
 * @param env
 * @returns
 */
export async function handleGithubOauth(url: URL, path: string[], request: Request, env: Env) {
  const client_id = env.GITHUB_OAUTH_CLIENT_ID
  const client_secret = env.GITHUB_OAUTH_CLIENT_SECRET
  if (path[2] === 'login' && request.method === 'GET') {
    return Response.redirect(
      `https://github.com/login/oauth/authorize?client_id=${client_id}&${url.search.slice(1)}`,
      302
    )
    // } else if (path[2] === 'hook' && request.method === 'GET') {
    //   const red = url.searchParams.get('redirect_uri')
    //   if (red) {
    //     return Response.redirect(red, 301)
    //   }
  } else if (path[2] === 'callback' && request.method === 'GET') {
    const uri = url.searchParams.get('redirect_uri')
    const location = url.searchParams.get('location')
    if (uri) {
      return Response.redirect(`${uri}?location=${location}`, 301)
    }
    // if (uri?.includes('localhost')) {
    //   return Response.redirect(`http://localhost:5173/auth/github${url.search}`, 301)
    // } else {
    //   return Response.redirect(`https://teemukoivisto-site.pages.dev/${url.search}`, 301)
    // }
  } else if (path[2] === 'authorize' && request.method === 'POST') {
    const { code } = await request.json<{ code: string }>()
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    })
    const result = await response.json<{ access_token?: string; error?: string }>()
    if (result.error || !result.access_token) {
      return new Response(JSON.stringify(result), {
        status: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
    }
    const getUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${result.access_token}`,
        'User-Agent': 'teemukoivisto-xyz-cf-worker',
      },
    })
    // const json = await getUserResponse.text()
    const json = await getUserResponse.json<GitHubUserData>()
    await env.authorized_users.put(json.id.toString(), result.access_token, {
      expirationTtl: 28800,
    })
    return new Response(JSON.stringify(json), {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
  } else if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }
  return new Response(null, {
    status: 404,
  })
}
