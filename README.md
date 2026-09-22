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
- **Contact form** — it currently just shows a "Message sent" success state in the browser. It isn't wired to send anywhere yet. Easiest options: [Formspree](https://formspree.io), [Resend](https://resend.com), or a small serverless function.
- **Services copy** — the four services listed are placeholders based on common agency offerings — edit `Services.jsx` to match what you actually offer.
