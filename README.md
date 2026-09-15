# Valentine's Invite 2026 💌

A goofy little Valentine's invitation I send to my favourite friends. They open a webpage, get asked to be your valentine, and (assuming they say yes) they pick a date and an activity. Their answer lands in my inbox. That's it. That's the whole thing.
(In case they say no,) This was an excuse to learn the basics: plain HTML, CSS, and JavaScript with no framework, plus figuring out how to actually get a form to email me without a backend.

## What it does

- Asks will you be my valentine?
- Has a **runaway "No" button** that dodges the cursor/touch, so "No" is technically an option but a difficult one.
- Lets them pick a **date and time** for the valentines day celebration.
- Runs a small **activity quiz** so they choose what we actually do.
- Shows a cute **end card** to wrap it up (hand drawn).
- Emails the whole thing (date, activity, wishes) to me when they accept.

## How the email part works

There's no server. The form posts to **Formspree**, which takes the submission and forwards it to my email. When someone accepts, `js/email.js` fires a POST to a Formspree endpoint with a subject of "They said yes" and the details they filled in.

## Tech

- HTML, CSS, JavaScript (no framework, no build step)
- [Formspree](https://formspree.io/) for form-to-email forwarding
- GitHub Actions for deployment
- Hosted as a static site

## Files

```
index.html          the page
js/
  main.js           wires everything together
  handlers.js       button and form logic (including the pesky No button)
  animations.js     the visual bits
  email.js          builds and sends the Formspree submission
styles/             the CSS
.github/workflows/  deployment
```

## Make it your own

Want to steal this for your own valentine? Swap the Formspree endpoint in `js/email.js` for your own form ID, change the text in `index.html`, and deploy.

## Status
They said yes :)
oh... and the repo:
It did its job. Not actively maintained, but the code is here if it's useful to anyone learning the same basics.
