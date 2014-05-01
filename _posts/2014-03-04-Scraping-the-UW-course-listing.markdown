---
layout: post
title: "Scraping the UW course listings"
date: 2014-03-04 00:1:00
description: I wrote a python script to scrape the University of Washington's course listings
categories: python uw scraper code
---

I was boredly sitting in class earlier this evening when someone mentioned that
he had been trying to scrape and parse UW's course listings with python. I
suggested BeautifulSoup, which he said he'd used, but it was still incredibly
dfficult. I had to give it a shot myself. If you want to follow along, [here's
one of the
pages](https://www.washington.edu/students/timeschd/B/SPR2014/css.html).
Without looking at the source, it's clearly a table or possibly a few of them,
but still relatively easy to parse. However, looking at the source reveals
that each timeslot of each course is in fact its own table, with one row and
cell, which contains a `<pre>` tag, which has the "table" made by using the
proper number of spaces to make everything line up. Like this:

```
<table width="100%" ><tr><td><pre>
       <A
       HREF=https://sdb.admin.washington.edu/timeschd/uwnetid/sln.asp?QTRYR=SPR+2014&SLN=12766>12766</A>
       B  5       MW     545-745P   UW1  221      NASH,ROB D
       Open     26/  48                      
                               MUST ENROLL IN CSSSKL 162 B                                                                                                                         
                               </td></tr></table>
```

After some brief spectulation with my fellow classmates about what they could
be doing on the backend, I got down to parsing it. I first tried `split`ing
it by the space character, then selecting each non-empty element and assuming
it was what belonged in that place, but I quickly discovered that different
courses have different numbers of values. For example, if a course is pass/no
pass, it gets a little thing saying that. Otherwise, it gets a blank space in
that "column".

So I went with selectig the specific range of the value I wanted. It's
horrible, will probably break, but is the most reliable I could come up with.
So, for example, characters 0 through 6 represent the enrollment restrictions
column. Characters 7 through 13 are the SLN, etc. I put this all into a python
script, which I tested on a number of different course listings, although not
as extensively as I would have liked. The code can be found [on my
github](https://github.com/thefinn93/UWCourseScraper). Feel free to file pull
requests or issues if you find a problem/see a possible improvement. I'm stil
not sure what to do with the data, but it has a lot of possibilities.

I'd love to see a collected set of utilities for accessing and parsing UW's
data. They have a lot of useful information like this that could be used to
build great things. Maybe UW will sanction an official API or something...
