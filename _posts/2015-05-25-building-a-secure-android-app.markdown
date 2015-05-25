---
layout: post
type: post
title: "Building a \"Secure\" Android App"
date: 2015-05-25 01:00:00
description: A silly school assignment turned kind of interesting
categories: android java security ssl tls certificates
---

This quarter I'm taking a class about security stuff. I figured it'd be somewhat interesting,
but found, much to my dismay, that the instructor very lacking in any practical knowledge related to
information security. The main assignment for the entire quarter is building a secure mobile
payement system for on Android.

After various discussion with the instructor, my group was able to talk him out of making us do
payment related stuff, and instead just are designing a "secure" chat app. After discussion with
my group, we decided to worry mostly about the connection security and authenticating the server
and client to each other securely. I had seen one site use TLS certificates to authenticate the
client, and I was vaguely aware that it could be done. On top of that, we used certificate pinning
on the client to ensure that CA-related hax can't be used to trick the client into trusting the
wrong server in a MITM-style attack. All of our source code is released on Github:
[client](https://github.com/thefinn93/justchat),
[server](https://github.com/thefinn93/justchat-web).

Authenticating the Server
-------------------------
The server has a TLS X.509 certificate that it presents to clients trying to communicate with it.
This certificate happens to be signed by CA in most trusted CA lists (StartCom), mostly for ease
of testing in a normal browser, but our app ignores this and looks for
[our specific certificate](https://github.com/thefinn93/JustChat/blob/master/app/src/main/java/ninja/justchat/PublicKeyManager.java),
mostly using examples from the
[OWASP wiki](https://www.owasp.org/index.php/Certificate_and_Public_Key_Pinning#Android). This means
that to attack our connection, an attacker would either need to steal our certificate, make a cert
with the exact same public key, or find a vulnerability in the Android TLS 1.2 implimentation or
the underlying crypto. These things seem pretty unlikely, but an actually good secure messaging
app would use end-to-end encryption, so that even our server couldn't read it, however I consider
this practice for more "traditional" apps where the server actually does have to read the data. The
internet-facing webserver is an nginx instance configured with the [Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/),
and setup to expect, but not require, client side certificates. It terminates the SSL session and
proxies back to our Java-based server, adding HTTP headers to indicate the status of the client's
certificate (non-existant, valid, invalid, etc). See: [nginx.conf](https://github.com/thefinn93/JustChat-web/blob/master/nginx.conf), added to git by request of
some of our classmates.

Authenticating the Client
-------------------------
The client authentication thing is a bit more tricky. We wanted to get away from the password-based
authentication model where the client proves they know/have access to a secret by handing the
secret over to the server, so certificates were the way to go. Client side SSL certificates on
Android ended up being easier than I was expecting. When you go to make an HTTPS request, you create
and object to represent the SSL context, then you call one of it's methods with 3 arguments: The KeyManager object
used for client-side certificates, the TrustManager object to be used to validate the remote server,
and the SecureRandom object used for entropy. In most examples online, all three of these are null,
and the examples that actually show a non-null one only do one (usually client-side certs or a
TrustManager), however it's pretty easy to combine the two, as we did in
[SecureConnection.java](https://github.com/thefinn93/JustChat/blob/master/app/src/main/java/ninja/justchat/SecureConnection.java). The key pair creation proved a bit trickeir, unfortunately. When the main activity is
launched, we check if we have a key stored, and if we don't we prompt the user for a usenrame. The
app (specifically, [GenerateKeyPair.java](https://github.com/thefinn93/JustChat/blob/master/app/src/main/java/ninja/justchat/GenerateKeyPair.java))
then generates a public/private key pair, stores the private key in the local keystore, and uploads
the public key to the server for signing in the form of a standard CSR. At the time of this writing,
the actual cert-signing part of the server doesn't work. We had been using a hacked-together python
server that spawned openssl, piped the CSR in to stdin, read the certificate out of stdout and
returned it to the client, but are in the process of moving to a
[Bouncy Castle](https://bouncycastle.org/) based CSR signing routine in the Java server. Once this
is complete, the server can authenticate the client by their having a certificate that has been
signed by our internal CA, and determine the speific one by either their certificate's common name
field, and/or their certificate fingerprint.

Other Thoughts
--------------
The server-side stuff is still pretty lacking, but the basics are there. We're hoping to get
something useful running by the end of the quarter to show to the teacher and class. If you're
looking for a good secure messaging app, try
[TextSecure](https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms). It actually
impliments secure end-to-end crypto and is developed by respected security researchers such as
Moxie Marlinspike. Our app is just for fun and shouldn't be treated as more secure than, say, SMS.
