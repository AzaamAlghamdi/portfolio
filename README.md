# Azaam — Arabic Game Localization Portfolio

A React + Vite portfolio with Motion-powered interactions and a static GitHub Pages deployment.

## Preview on Windows

Node.js 20 or newer is required. Open Command Prompt in this folder, then run:

```bash
npm install
npm run dev
```

Open the local address Vite prints, normally `http://localhost:5173`.

If you already have pnpm installed, `pnpm install` and `pnpm dev` work too.

Create a production build with:

```bash
npm run build
```

## Deployment

The app builds to `dist/`. The included GitHub Actions workflow deploys that directory to GitHub Pages when changes reach `main`.

Before the first React deployment, set **Settings → Pages → Source** to **GitHub Actions**. The custom domain is preserved through `public/CNAME`, and the portfolio PDF and project artwork are served from `public/`.

## Design direction

The site is designed as a bright bilingual editorial folio: large typography, warm paper textures, full-width project chapters, an interactive translation proof, and a connected production-method index. It avoids the repeated square-card layout and respects reduced-motion preferences.
