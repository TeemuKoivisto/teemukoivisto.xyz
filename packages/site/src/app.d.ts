declare global {
  namespace App {
    interface Platform {
      env: {
        BUCKET: R2Bucket
        authorized_users: KVNamespace
        SUPER_USER_ID: string
        GITHUB_OAUTH_CLIENT_ID: string
        GITHUB_OAUTH_CLIENT_SECRET: string
      }
    }
  }
}

export {}
