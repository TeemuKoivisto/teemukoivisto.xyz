# [teemukoivisto.xyz](https://teemukoivisto.xyz)

This is the latest iteration of my blog, a Sisyphean task that might have now finally reached its adult stage. Just to witness this slow descend into madness, here are the first iterations with [Gatsby](https://github.com/TeemuKoivisto/simple-gatsby-typescript-blog) and [Next.js](https://github.com/TeemuKoivisto/nextjs-blog-typescript-tailwind). So why weren't those good enough and instead I rewrote it again and again? Well I guess I am one of those people who enjoy more the process than the end-result. Learned a lot in each case but this final iteration was to just cut the external dependencies to minimum and make it as close to HTML & web standards as possible in order to make its maintenance easy-peasy. Also, writing your own blog engine - how cool is that?

Funnily enough, for my first blog I authored this SEO library https://www.npmjs.com/package/react-seo-meta-tags and for this third blog, a vite plugin to dynamically render templates using the usual `/blog` etc paths and `[slug]` patterns, popularized by Next.js and alike.

BROKEN since base url doesnt work as it should as of 5.11.2022

[GitHub pages](https://teemukoivisto.github.io/teemukoivisto.xyz/)

# How to run locally

You need need Node.js >=16, pnpm >=7.

1. `pnpm i`
2. `pnpm --filter svelte-seo-meta-tags build`
3. `pnpm --filter site dev`
