# worker

This is a Cloudflare worker to handle OAuth and saving/fetching comments. Yes, it uses KV which requires paid subscription. Probably I'll refactor it to use just R2 so that it all can be used within free tier.

## How to install

1. First create a R2 bucket from dashboard and KV namespace:

```sh
wrangler secret put GITHUB_OAUTH_CLIENT_SECRET
wrangler kv:namespace create authorized_users
```

2. Create new GitHub app https://github.com/settings/apps/new
3. Create client secret, add "GitHub App name", "Homepage URL" and two callback URLs for both prod and localhost:

- https://teemukoivisto.xyz/auth/github
- http://localhost:5173/auth/github

4. Also I think you have create a "Private key" (for some reason. Remember to save changes
5. Once created copy the client id and replace `GITHUB_OAUTH_CLIENT_ID` env as well as `"name"`, `"account_id"` `"bucket_name"` and kv_namespaces `"id"` in `wrangler.toml`.
6. In Cloudflare dashboard add the secret as `GITHUB_OAUTH_CLIENT_SECRET` env variable to the worker.
7. Deploy changes. Try logging in to GitHub locally. Use Cloudflare worker real-time logs for debugging (incase GitHub throws a redirect error)
8. Submit your first comment. You can see the GitHub ID of your account from the stored JSON in Cloudflare to replace the `SUPER_USER_ID` in the `wrangler.toml`
9. And you're done
