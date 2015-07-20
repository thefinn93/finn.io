---
layout: post
type: post
title: "A Domain Availability Finder"
date: 2015-07-20 18:30:00
description: I built a tool to check a name against every TLD
categories: domains tlds icann sillyness weekendproject
---

First, demo: [Domain Finder](https://domainfinder.finn.io/).

I have been frustrated a many times by Namecheap's search interface, trying to suggest other
domains to me and being clunky to search for one different TLDs. So I built a simple site to do
what I wanted: Check one name against every TLD.

The code is pretty simple, it just downloads a list of TLDs from Namecheap and caches them
(currently forever, something i've been meaning to change). Then the client gets a list of TLDs from
the server (currently does not cache them, something that might be nice), and when it the user requests
a domain name it checks it against every TLD it knows, in batches. Namecheap's API docs don't specify
any maximum size of the request, but in testing requesting *every* TLD didn't seem to work. I've been
trying to determine the optimal batch size, so I've set it to randomize between 1 and 50 (for now)
and [record stats](https://domainfinder.finn.io/stats) on the time it takes namecheap to respond.
Once I've collected sufficient data I may change the range that the batch size can be or make it
static.

The results are displayed in a simple list, with green boxes indicating availability. The links on
the green boxes point to a NameCheap page to buy the domain, the links on the red boxes point to
the domain on http.

![Domain Finder Screenshot]({{ 'posts/2015-07-20/domain-finder-screenshot.png' | asset_path }})

[Source on Github](https://github.com/thefinn93/domain-availability)
