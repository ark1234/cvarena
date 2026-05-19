# CV-Arena Project Page

Static project page for **CV-Arena**, deployed via GitHub Pages.

Live URL (after enabling Pages): `https://ark1234.github.io/cvarena/`

## Structure

```
web/
├── index.html                 # main page
├── static/
│   ├── css/style.css          # styling
│   ├── js/leaderboard.js      # sortable leaderboard data + render
│   ├── images/                # converted figures (jpg/png)
│   └── pdfs/cvarena_paper.pdf # paper PDF
└── README.md
```

## Local preview

```bash
cd web
python3 -m http.server 8000
# open http://localhost:8000
```

## What to update before going public

- `static/js/leaderboard.js` — replace placeholder rows in `LEADERBOARD_DATA` with real numbers.
- `static/images/compare/` — drop in real before/after pairs and edit the `<img-comparison-slider>` blocks in `index.html`.
- `static/images/` gallery — replace thumbnails with curated favorites.
- `index.html` — update the `arxiv-link` href once arXiv is posted.

## Deployment

```bash
git init && git add -A
git commit -m "init: CV-Arena project page"
git branch -M main
git remote add origin git@github.com:ark1234/cvarena.git
git push -u origin main
```

Then in the repo settings: **Settings → Pages → Source: `main` / `/web`** (or move files to repo root).

## Credits

Adapted from [Academic-project-page-template](https://github.com/eliahuhorwitz/Academic-project-page-template)
(Nerfies lineage). Sliders: [img-comparison-slider](https://img-comparison-slider.dev/).
Lightbox: [GLightbox](https://biati-digital.github.io/glightbox/).
