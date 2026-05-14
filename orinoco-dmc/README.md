# Orinoco DMC

## Contact form captcha

The contact form uses Cloudflare Turnstile plus a hidden honeypot field to reduce bot submissions.

1. Create a Turnstile widget in Cloudflare.
2. Add your production domain and any preview/local domains you want to test.
3. Copy `.env.example` to `.env.local` for local development.
4. Set these variables locally and in Vercel:

```bash
VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
TURNSTILE_SECRET_KEY=your_cloudflare_turnstile_secret_key
```

`VITE_TURNSTILE_SITE_KEY` is public and renders the widget in the browser. `TURNSTILE_SECRET_KEY` is private and must only be configured as an environment variable on the server/Vercel side.

Without `TURNSTILE_SECRET_KEY`, the API logs a warning and skips captcha verification so local development can still run.

## Development

```bash
npm install
npm run dev
```
