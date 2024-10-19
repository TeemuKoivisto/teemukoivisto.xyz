# [teemukoivisto.xyz](https://teemukoivisto.xyz)

A blog.

Feel free to use it as boilerplate but please make the styles your own! And the contents, obviously.

[CloudFlare](https://teemukoivisto-site.pages.dev/)

# How to run locally

You need need Node.js >=16, pnpm >=7. Also to deploy it: `wrangler`, Cloudflare account and [GitHub oauth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).

1. `pnpm i`
2. `pnpm --filter svelte-seo-meta-tags --filter lib build`
3. `pnpm site` should start the app

# How to deploy

In order to have the oauth working, you need to create a Github oauth app https://github.com/settings/developers and save the values to `packages/site/.dev.vars` for local dev.

```
GITHUB_OAUTH_CLIENT_ID=
GITHUB_OAUTH_CLIENT_SECRET=
```

To deploy, you should create additional oauth app (1 for localhost, 1 for prod) and create a Cloudflare pages project. And then set the secrets & variables as in `wrangler.toml`, R2 bucket and KV namespace.

# Others

Use `pnpm format` to Prettify and lint
