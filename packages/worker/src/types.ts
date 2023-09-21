export interface Env {
  BUCKET: R2Bucket
  authorized_users: KVNamespace
  SUPER_USER_ID: string
  GOOGLE_OAUTH_CLIENT_SECRET: string
  GOOGLE_OAUTH_CLIENT_ID: string
  GITHUB_OAUTH_CLIENT_SECRET: string
  GITHUB_OAUTH_CLIENT_ID: string
}
