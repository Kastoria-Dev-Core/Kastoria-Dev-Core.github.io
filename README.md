# kastoria-dev-core.github.io

The website of Kastoria Dev Core: https://kastoria-dev-core.github.io/ (Greek) and https://kastoria-dev-core.github.io/en/ (English).

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), in TypeScript. It's a static site, but it reads live data when it's built:

* the Kastoria bus network, from the passenger app's published `transit.json`, drawn as the map at the top (`src/lib/network.ts`)
* the apps' latest releases and the organisation's latest merged pull requests, from GitHub's API (`src/lib/github.ts`)

`.github/workflows/deploy.yml` builds it and publishes it on GitHub Pages on every push to `main`, and once a day so the map, the releases and the pull requests stay current.

## Working on it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # into dist/
```

* `src/components/Home.astro` the page, for both languages
* `src/components/NetworkMap.astro` the map of the bus lines
* `src/lib/i18n.ts` all the text, in Greek and English
* `src/styles/global.css` the brand colours and fonts (Commissioner, like the apps, and JetBrains Mono)
* `public/` the logo, from the organisation's `.github/brand`, and screenshots of the apps
