# worker

Remember to first create a R2 bucket from dashboard and KV namespace:

```sh
wrangler secret put GITHUB_OAUTH_CLIENT_SECRET
wrangler kv:namespace create authorized_users
```

Then you need a GitHub app also for the OAuth https://github.com/settings/apps/new

After adding the app name, for the callback URLs I used:

- https://teemukoivisto-xyz-worker.tkoivisto456.workers.dev/github/callback
- http://localhost:5173/auth/github
- https://teemukoivisto-site.pages.dev/auth/github

Once you've created the app, copy the `Client ID` and replace `GITHUB_OAUTH_CLIENT_ID` env as well as `"name"`, `"account_id"` `"bucket_name"` and kv_namespaces `"id"` in `wrangler.toml`. Add the client secret from Cloudflare dashboard as secret `GITHUB_OAUTH_CLIENT_SECRET` env variable to the worker.

After that, try submitting your first comment. You can see the GitHub ID of your account from the stored JSON in Cloudflare to replace the `SUPER_USER_ID` in the `wrangler.toml`.
