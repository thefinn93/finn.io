---
layout: post
type: post
title: "Silly Things With Home Automation"
date: 2015-07-21 08:30:00
description: I built a silly webapp to control the lights in my house
categories: sillyness weekendproject X10 homeautomation
---
For a long time I've owned some X10 home automation stuff. The idea is pretty simple: there are
some modules that you plug your lamps and whatnot into:

![X10 Module Example]({{ 'posts/2015-07-21/x10module.jpg' | asset_path }})

Then they have a controller that allows you to switch the various units on and off. All of the
signals go over the power lines in ways I don't understand ([this page might help if you want to try](https://en.wikipedia.org/wiki/X10_(industry_standard))).
They also make computer controller units, which obviously require some Windows app that probably
works on Windows 95 and Windows 98 only. It connects via a serial port. Fortunately, as usual,
there's some 3rd party Linux software to control it, called [HEYU](http://heyu.tanj.com/). I had got
this setup before, but never gone as far as actually doing anything with the computer controls. Then
this weekend I decided to sit down and write up a nice web interface. There are other Heyu web
interfaces, but they are all difficult to get running and seem way too complex for my liking. Mine
has a clean UI, is written in Python using Flask and has a nice phone UI:

![x10web Screenshot]({{ 'posts/2015-07-21/x10web.png' | asset_path }})

The configuration file allows you to define housecode and unit compinations and give them a name,
then displays sets of buttons for each one. It also lets you do HTTP basic auth. This was mostly
just something I wanted to play with, I doubt it will be that useful to me as there are few
situations where it's easier to unlock my phone, open my browser, load this page, sign in, then click
the off button than just getting up and hitting the switch.

[x10web's source code is on GitHub](https://github.com/thefinn93/x10web)
