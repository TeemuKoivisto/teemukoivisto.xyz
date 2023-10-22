---
datePublished: '2023-05-29'
dateModified: '2023-05-29'
title: Decoupling you from Chrome - writing an open-source bookmark extension
description: na
tags:
  - google
  - chrome
  - extension
  - cloudflare
  - r2
  - synchronization
---

# The problem

Recently I noticed that Google begun showing a nag-screen in Youtube for using Adblock. Which after a while resolves to not even displaying videos since, apparently, they need to milk more money from Youtube. What an innovation from the leading tech companies. Instead of building actually good products, you want to squeeze more from what you have...

Anyway, you can bybass that by logging out from Google and vóila, the nag-screen is gone. However, this also means you log out from _all_ of your Google services which is rather annoying if you're using GMail, Chrome and occasional Google login to services you didn't bother to sign-up with email & password.

This has got wondering, do I really want to be milked like a feeble sheep I am? Jump through Google's more and more annoying hoops as I have to pay for my own SMS verification messages and most of all, allow the extraction of all my bookmarks and data for whatever ML models Google uses internally.

Bah, I say! While I like many of Google's free services: Drive, Docs, GMail and Chrome, I do not accept this slow boiling of my xxx moralities in the steel kettle of Google's xxx soup.

So it is about the time I do something about it.

First of what's most annoying about the Google's linking of services is that you can't use multiple Google accounts in the same Chrome session really well. All or your GMail and Youtube accounts sync with the logged-in Chrome account and switching between really just is a hassle.

So I ask myself, why I need to be signed-in with Chrome in the first place? When I think about, basically I only use it to synchronize my bookmarks and keep them stored. Hmm. Is there an open-source option to do this instead? It doesn't need to be that fancy, just allowing signing in with whatever login and then syncing bookmarks _without_ worrying about your data being stolen or lost or put behind a paywall. It is so annoying we can't build simple tools anymore but everything has to be a subscription service to justify the redundant features added in, making the original solution worse.

Anyway, I checked them out. There were _no_ Chrome extensions that would have done this. Shit. I guess I have to build my own then.

## Bookmark Chrome extension

https://github.com/TeemuKoivisto/open-bookmarks

By quickly cannibalizing my previous Chrome extension I built with Svelte to inspect ProseMirror rich-text editors, I was able to pretty quickly come with a working boilerplate. However the real work starts here with the details.

## Adding a persistent Oauth login

Since I don't want to bind my login to the Chrome session, I have to rollout my own Oauth login. No emails or passwords since I don't want to be responsible for those. I'll add GitHub login first since it's the one I've used before.

xxxpoop

## Syncing bookmarks

This is probably the most important part. Now, to sync bookmarks we have be extra careful since we _never_ want to lose any information. So if you were, for example, to login with a blank Chrome account which had zero bookmarks we want to allow you to specifically choose whether to persist current bookmarks or start afresh.

hmmm

I've used Yjs CRDT before and I know its strengths but also its weaknesses. One of them being complexity, the other being you're left at the mercy of its synchronization model. It's quite easy to shoot yourself in the foot with it if you're not careful when you say, initialize your document. If you don't await for it to sync properly, you might accidentally overwrite either your initial content or those of the client. Fetching an existing doc is even more accident-prone if you were to render your view _before_ the doc had synced since Yjs can trigger client-updates that overwrite content [link]. Uff.

Anyway, looking at the schema I see it's not that complicated JSON that can be handled by rather simple OT operations. What can you do with bookmarks? Not much - you either 1. create them, 2. move them or 3. delete them. Bookmarks are inherently _non-collaborative_ since they are tied to your single-account and make no sense to sync with other running sessions. Duplication is also quite non-existent problem as every bookmark is most likely unique and if there were multiple, it would probably be a mistake either way.

Also, to make this thing cheap since I don't want to pay for any databases and whatnot I am going to use Cloudflare R2 as the persistence layer. It's cheaper than S3 and coupled with Cloudflare workers, which are cheaper & easier to use than AWS lambdas, comes as prety powerful combo.

What I do here is make a simple worker that stores the bookmarks as encrypted JSON. We save the secret key in a separate JSON with the authentication details which you retrieve as you login. It's not perfect but at least you'll have the xxx peace of mind that nobody will be reading your bookmarks in plain JSON. And you can be rest assured I have zero interest in using them for any kind of data mining.

So here's the code xxxlink

Simple but works!

## Tying it together

Authoring Chrome extensions, from my last experience, was a rather painless process. However, now that I am requesting _edit_ access to all your bookmarks I expect this to be less easy than previously.

For bundling the extension I am using this pipeline where I version using changesets and awk the new version and set it in the `manifest.json` file, all inside the GitHub action. Works pretty nice, feel free to use it.

Then I just drop in the usual BS about how I will use my extension and wait and see.
