import { error } from '@sveltejs/kit'

import type { RequestHandler } from './$types'
import type { AuthorizedUser, AuthorizeGitHub, GitHubUserData } from '@teemukoivisto.xyz/lib'

export const POST: RequestHandler = async event => {
  if (!event.platform) {
    return error(500, 'No event.platform defined')
  }
  const { env } = event.platform
  const { code } = await event.request.json<{ code: string }>()
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  })
  const result = await response.json<{ access_token?: string; error?: string }>()
  if (result.error || !result.access_token) {
    return new Response(JSON.stringify(result), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  const githubUser = await (
    await fetch('https://api.github.com/user', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${result.access_token}`,
        'User-Agent': 'teemukoivisto-xyz-cf-worker',
      },
    })
  ).json<GitHubUserData>()
  const authUser: AuthorizedUser = {
    id: githubUser.id.toString(),
    avatar_url: githubUser.avatar_url,
    author: githubUser.login,
    origin: 'github',
  }
  await env.AUTHORIZED_USERS.put(result.access_token, JSON.stringify(authUser), {
    expirationTtl: 28800,
  })
  const userId = githubUser.id.toString()
  const json: AuthorizeGitHub = {
    user: githubUser,
    credentials: {
      user_id: userId,
      sudo: userId === env.SUPER_USER_ID,
      token: result.access_token,
      expires: Date.now() + 28800 * 1000,
    },
  }
  return new Response(JSON.stringify(json), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  // const dbUser = await findOrCreateGithubUser(githubUser, event.platform.env)
  // if (!dbUser) return error(500, 'Failed to find or create db user')
  // const payload = {
  //   user_id: dbUser.id,
  //   email: dbUser.email,
  //   superUser: dbUser.email === 'teemu.koivisto@alumni.helsinki.fi'
  // }
  // const monthExpiry = 60 * 60 * 24 * 30 // 30 days
  // const timeNow = Math.floor(Date.now() / 1000)
  // const secret = base64url.decode(event.platform.env.JWT_SECRET || '')
  // const jwt = await new SignJWT(payload)
  //   .setProtectedHeader({ alg: 'HS512' })
  //   .setIssuedAt()
  //   .setIssuer('cardmaker-prod.pages.dev')
  //   .setAudience('cardmaker-prod.pages.dev:oauth')
  //   .setExpirationTime(timeNow + monthExpiry)
  //   .setIssuedAt(timeNow)
  //   .sign(secret)
  // const session = {
  //   oauth: {
  //     id: githubUser.id.toString(),
  //     avatar_url: githubUser.avatar_url,
  //     author: githubUser.login,
  //     origin: 'github'
  //   },
  //   access_token: result.access_token
  // }
  // await event.platform.env.SESSIONS_KV.put(jwt, JSON.stringify(session), {
  //   expirationTtl: monthExpiry
  // })
  // event.cookies.set('session', jwt, {
  //   path: '/',
  //   httpOnly: true,
  //   sameSite: 'strict',
  //   secure: !dev,
  //   maxAge: monthExpiry
  // })
  // const body: z.infer<typeof AUTH_RESP> = {
  //   user: dbUser,
  //   expires: Date.now() + monthExpiry * 1000
  // }
  // return new Response(JSON.stringify(body), {
  //   status: 200,
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
}
