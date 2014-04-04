---
layout: post
title: "Powerline, Minature Octo Batman, and more"
date: 2014-04-03 23:00:00
categories: python tmux vim cjdns code
---
Last week, after replacing my failing hard drive with an SSD and reinstalling
my OS, I was playing with tmux and vim configs when I rediscovered
[Powerline](https://github.com/Lokaltog/powerline). It's a script to provide
extensible statusline elements to a variety of things (including vim, tmux, i3,
zsh, etc). I installed it into my tmux, and loved it so much that I ended up
putting it on several of my servers as well. Many of the default modules are
nice to have in the tmux stausline, athough I changed it a bit from the
default.

But I wanted more. For example, one of the things I had in my previous
tmux's config was the number of currently connected
[cjdns](https://github.com/cjdelisle/cjdns) peers. So I got to work learning
how to write my own modules for it. Turns out there is approximately zero
documentation for doing this. Github user [Omega](https://github.com/omega)
expressed similar issue in
[#409](https://github.com/Lokaltog/powerline/issues/409) on the official
powerline repo, and was kind enough to link to [his powerline
module](https://github.com/omega/powerlinex-segment-plenv), which proved simple
enough to read and understand. From there, I was able to create a series of
modules to check everything from cjdns peers to the current price of bitcoins.

I've wanted to publish them, but failed to find a good name. Fortunately,
Github has a feature that randomly generates repo names. Thus,
[minature-octo-batman](https://github.com/thefinn93/minature-octo-batman) was
born. I even put it in [pypi](https://pypi.python.org/pypi/miniatureOctoBatman)
(my first package there!), so you can install it easily with pip or
easy_install. The README file contains a full list of the avalable modules and
how to install them.

While I used powerline in tmux I decided to go with a powerline-esq but not
actually powerline vim config. Mostly because I liked [prurigro's
vimrc](https://github.com/prurigro/darkcloud-vimconfig) and did't really feel
comfortable mucking about with vimrc files myself. It's an excellent vimrc,
with syntax highlighting for every language I've thrown at it, suggestions,
a powerline-esq status line, and all sorts of things I haven't even discovered.
