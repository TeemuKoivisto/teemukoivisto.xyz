---
datePublished: '2024-07-25'
dateModified: '2024-07-25'
title: AWS CloudFront and Edge Lambda redirect
description: Hello
tags:
  - aws
---

# Introduction

I recently had to set up a redirect from an old domain and bunch of unused ones to a single main domain. This wasn't that trivial to do with AWS and Google didn't really yield great results. So uhh maybe this one will rise to the top.

The objective:

- redirect all traffic from n domains to single domain
- retain the path and CNAME of the original request
- keep it simple

## Certificate Manager

So the big thing in this whole process was setting up HTTPS certificates for all the domains with a catch-all wildcard (to redirect any CNAME address as well). Go to x > Certificate Manager and you should see something similar:

img

Select y

Then input all the domains you want with \*.domain.com wildcards incase you need CNAME addresses as well. I highly recommend it doing it anyway though, since recreating the certificates requires you to shutdown the whole domain for minutes and it doesn't cost anything.

Okay, cool. Click create.

Now you should see your domains at Route 53 receive these weird looking CNAME strings:

img

If you do, the certs are now setup and CloudFront can now use them as targets.

## Edge Lambda

We'll create the edge lambda next. Go to Lambda > select us-east-1 region > Create > x.

img

Copy paste this following code:

```js

```

As you note, the `statusCode` has changed to `status`. This is a "feature" of edge lambdas and incase you used the provided example Hello World code, your lambda would mysteriously just crash and CloudFront give a generic 502 "Opsie". How nice and maddeningly ridiculous API divergence.

Anyway, deploy the function to Edge Lambda (without triggers). It should create a Version 1. Copy the ARN of the lambda (the autofill doesn't find it).

## CloudFront

Next, go to CloudFront. The region is global so no need to change it. Create a new distribution.

img

So change x, y, z. Find the certificate, add all the CNAME domains.

And at the bottom, add a Origin Request behavior with the ARN of the edge lambda function you just created + version. It should look like:

xxxx:1

Don't include body. Hit create.

Now the deployment should start and depending on the edge caches, the domains should start redirecting within minutes or less.

And well that's it! Nothing too complicated but, as expected really, AWS makes things a little less straightforward as you'd hope. Especially edge lambdas are a continuous source of pain to me at least.
