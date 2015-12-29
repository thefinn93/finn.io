---
layout: post
type: post
title: "32C3 Torrent Feeds"
date: 2015-12-29 11:00:00
description: 32C3 doesn't provide torrent feeds, so I made them
categories: 32C3 torrent bittorrent feeds rss atom
---
The 32nd Chaos Computer Congress is going on right now, and they have all of the talks available in
a variety of audio and video formats, and RSS feeds of these things, all on their [media server](https://media.ccc.de/b/congress/2015). Unfortunately, there's no feeds for the torrent files
they provide, so I wrote up a quick web service to gather their feeds and convert them into torrent
feeds.


You can see it live here: [32C3 Torrent Feeds](https://cccfeeds.finn.io) and read/fork the source [here](https://github.com/thefinn93/CCC-torrent-feed).


For reasons surpassing my understanding, ruTorrent's RSS feed feature prepends the feed URL to
the URL of the torrent, but it also has a handy "Rule Manager" to rewrite the torrent URLs. My rule looks like this:

* If the URL for the torrent **description** matches pattern: `|.*cdn.media.ccc.de/(.*)|i`

* then replace the URL of the torrent **download** with: `https://cdn.media.ccc.de/${1}`
