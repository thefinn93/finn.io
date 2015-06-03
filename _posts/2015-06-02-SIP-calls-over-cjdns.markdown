---
layout: post
type: post
title: "SIP calls over cjdns"
date: 2015-06-02 23:35:00
description: A quick tutorial for making secure direct peer-to-peer VoIP calls over cjdns
categories: cjdns meshnet voip sip
---

Following a recent discussion on IRC, I'm writing up a brief tutorial on how to make secure VoIP calls over
a cjdns network (such as [Hyperboria](https://hyperboria.net)). Since cjdns encrypts everything end
to end, there is no need to worry about ZRTP or other sorts of connection security. My computer is
currently running Ubuntu 14.04 (Trusty), but this should work with most distros (obviously the
install commands may vary by distro). I assume you've already got cjdns installed and you're able
to use it to communicate with others. If not, take a look at the cjdns
[README](https://github.com/cjdelisle/cjdns/blob/master/README.md#how-to-install-cjdns), then come
back.


The first step is pretty straight forward: Install linphone. On Ubuntu/Debian, this is as simple as

```
sudo apt-get install linphone
```

When that's done, start it up. It'll present you with this screen:

![Linphone Startup Screen]({{ 'posts/2015-06-02/linphone-firstrun.png' | asset_path }})

Go ahead and hit cancel on that dialog. You will, unfortunately, need to do this every time. Linphone
does not seem to offer an option to simply not annoy the user with the crappy account creation
wizard, and since we're doing direct peer-to-peer calls, you won't have
and account. The next step is to go into the *Options* menu and select *Preferences* at the top.
The only change you should need to make is to check the checkbox under **Transport** labeled *Use IPv6
instead of IPv4*. You'll also want to make sure that under **NAT and Firewall** on that same screen,
*Direct connection to the internet* is selected so it doesn't attempt to do any NAT hole punching or
anything. My settings dialog looked like this when I was done:

![Linphone Settings Screen]({{ 'posts/2015-06-02/linphone-settings.png' | asset_path }})

Now close settings and shut down Linphone (Options->Quit - mearly closing the window will cause it
to hide itself in the notification area but still run) and reopen it. This is needed to make it
bind to IPv6 instead of IPv4. To test, you can call my PBX. There are a few different addresses:

```
sip:milliwatt@[fc28:ab92:6b6e:d624:ec1a:c336:d28a:fd69]
```

Will play a milliwatt tone, so you can judge the quality of the link. Note that my PBX is running
on a shitty home network connection so link issues may be my end as well

```
sip:conference@[fc28:ab92:6b6e:d624:ec1a:c336:d28a:fd69]
```

Is a conference room. Maybe others will be in there!

```
sip:ivr@[fc28:ab92:6b6e:d624:ec1a:c336:d28a:fd69]
```

Is a silly, mostly non-functional IVR menu I made. Most of the options don't work.

```
sip:finn@[fc28:ab92:6b6e:d624:ec1a:c336:d28a:fd69]
```

Will call the IP phone on my desk. I can't promise I'll answer it. And someone else might decide to.

To call these, you simple place the address in the text box at the top of Linphone and hit the big
green icon to the right of it.

Your identity is displayed at the bottom of linphone, and to call you one must simply enter that
into their SIP client. Jitsi and other SIP clients should be able to interconnect with Linphone no
problem, but I haven't got a nice tutorial for setting all of those up.
