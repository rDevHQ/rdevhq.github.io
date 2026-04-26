# rDevHQ Homepage

Static homepage for rDevHQ projects and app store support links.

## Local preview

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy

This repo is intentionally static. Deploy it with Cloudflare Pages using:

- Build command: none
- Output directory: `/`
- Root directory: repository root

Add each new rDevHQ app as a new navigation panel in `index.html`.
