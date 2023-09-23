# [teemukoivisto.xyz](https://teemukoivisto.xyz)

A blog.

[CloudFlare](https://teemukoivisto-site.pages.dev/)

# How to run locally

You need need Node.js >=16, pnpm >=7. Also to deploy worker `wrangler` & paid Cloudflare account (for KV) and [GitHub app to use GitHub oauth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).

1. `pnpm i`
2. `pnpm --filter svelte-seo-meta-tags --filter utils build`
3. Configure CF worker at `packages/worker` with your variables
4. `pnpm cf`
5. Edit site env: `cp packages/site/.env-example packages/site/.env`
6. `pnpm site`

Use `pnpm format` to Prettify and lint
