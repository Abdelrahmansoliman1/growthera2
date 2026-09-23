# Growth Era — Marketing Site

A single-page site for Growth Era, built with **Vite + React + Tailwind CSS**.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder — upload that anywhere (Netlify, Vercel, your host).

## Project structure

```
src/
├── App.jsx                 # assembles all sections
├── main.jsx                # React entry point
├── index.css                # Tailwind + custom utility classes
└── components/
    ├── Header.jsx           # sticky nav — bolds/underlines the active section
    ├── Hero.jsx
    ├── About.jsx
    ├── Services.jsx
    ├── Contact.jsx           # contact form (UI only — see note below)
    ├── Footer.jsx
    ├── BackToTop.jsx
    ├── Logo.jsx              # the Growth Era mark, as SVG
    └── ui/
        ├── Eyebrow.jsx
        ├── PrimaryButton.jsx
        └── GhostButton.jsx
```

## Things to update before launch

- **Contact email** — replace the placeholder `hello@growthera.co` in `Contact.jsx`.
- **Contact form** — submissions POST to `/api/contact` (a Vercel serverless function in `api/contact.js`), which emails them via [Resend](https://resend.com). Spam is blocked with [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/), verified server-side. Set `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`, `VITE_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in Vercel → Settings → Environment Variables (see `.env.example`). Use `npx vercel dev` to test locally — `npm run dev` does not serve `/api`.
- **Services copy** — the four services listed are placeholders based on common agency offerings — edit `Services.jsx` to match what you actually offer.
