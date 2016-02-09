---
layout: post
type: post
title: "Let's Encrypt and Nginx"
date: 2016-02-08 16:00:00
description: A quick how-to for Let's Encrypt and nginx
categories: letsencrypt ssl tls nginx webroot howto
---
[Let's Encrypt](https://letsencrypt.org) started handing out free TLS certificates signed by a
certificate authority that almost every browser trusts. Their client currently doesn't work well
with nginx, and I've found myself explaining how to use it with nginx on IRC a number of times, so
I decide to just write it up here.


# Issuance
Let's Encrypt has a number of ways to verify you are the owner of the domain, but the easiest one
for servers that already have a web server running it called "webroot", in which you place a
file at a pre-defined path on your site and they check it. The Let's Encrypt client will generate
the file for you and do most of the hard stuff, you just need to give it a place on to put the file
that nginx will serve it from. **If you're nginx is configured to proxy everything to somewhere
else, skip down to the section labeled Proxying**. Otherwise, determine the location that it serves out of (usually
`/var/www/html` or similar). Then, clone the repo and run Let's Encrypt with the webroot. In
the following code snippet, replace `/var/www/html` with wherever your root directory is:

```
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
./letsencrypt-auto -a webroot --webroot-path /var/www/html --email your@email.tld -d your.domain -d www.your.domain certonly
```

you can specify up to 100 domains via multiple `-d`, they must all be valid from the same webroot
though. You should give them a good email to contact you at, they only use for important things
(problems with your certs, expiry notices...).


# Installation
Once you have the certs, you need to install them. [Mozilla's SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
provides some good resources for what your nginx config should look like. `ssl_certificate` should
point to `/etc/letsencrypt/live/<your domain>/fullchain.pem`, and `ssl_certificate_key` should be
`privkey.pem` in the same directory. `ssl_trusted_certificate` from their config is `chain.pem` and
you have to generate the dhparam yourself (`openssl dhparam -out /etc/ssl/dhparam.pem 2048`).

# Proxying
If you proxy everything back (eg `location / { proxy_pass ... }`) to a different program, that's
fine, you just need to make a special rule for path it's looking for to be read off the disk.
I put something like this in my server block:

```
location /.well-known/acme-challenge { root /var/www/html; }
```

Then (after reloading nginx, of course) continue above with your `webroot-path` set to `/var/www/html`.
This can obviously be any location you want, as long as you feed the same path to letsencrypt as nginx
