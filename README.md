# Thimar

A modern educational website built with React, Vite, and Tailwind CSS.

## Development

Install dependencies and run the app locally:

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
```

The server bundle is written to `.output/server` and static assets to
`.output/public`. Run `npm run preview` to serve the production build locally.

## Deployment

The build detects its hosting target automatically. On Vercel it emits
`.vercel/output` (Build Output API), so no extra configuration is needed beyond
importing the repository — leave the build command as `npm run build`.
