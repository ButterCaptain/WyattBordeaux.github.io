# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is Wyatt Bordeaux's personal portfolio site, hosted via GitHub Pages at `WyattBordeaux.github.io`. It is a static, no-build site: plain HTML/CSS/JS with no package.json, bundler, or test suite.

## Development

There is no build step. To preview locally, just open `index.html` in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`) so relative asset paths resolve correctly. There is no lint or test command — verify changes by opening the affected page(s) in a browser.

## Architecture

- **`index.html`** — the landing page, made of four anchored `<section>`s (`#skills`, `#projects`, `#orgs`, `#hobbies`) that `main.js`'s nav links and scroll-spy target directly. `#projects` and `#hobbies` hold project cards (`<article class="project-card">` with an `onclick` that navigates to a standalone project page — no client-side router); `#orgs` instead holds `<article class="org-card">` entries with a `.org-gallery` of images that open in the lightbox (see below).
- **`Project_Template*.html`** (`Project_Template.html`, `1`–`5`) — one static HTML file per project/hobby writeup, reusing the shared `style.css` + `project.css`. Section structure varies by how much there is to say: fuller writeups follow hero → Overview → Problem & Motivation → Screenshots/Media → Technical Details → What I Learned → Next Steps, while shorter ones (e.g. `Project_Template2.html`, `Project_Template5.html`) only have hero → Overview → Screenshots. To add a new project: copy the closest existing template by scope, edit its content/images, then add a matching `<article class="project-card">` entry in `index.html` pointing at the new file.
- **`style.css`** — global site styles (hero, nav, skills grid, project/org cards, footer). **`project.css`** — styles specific to the individual project pages, layered on top of `style.css`.
- **`main.js`** — shared vanilla JS loaded on every page, in numbered sections: hero parallax/fade-on-scroll, `IntersectionObserver` reveal animations for `.reveal`/`.reveal-stagger`, a runtime-injected fixed top nav (`buildNav()` — builds both markup and its own `<style>` block, handles the mobile hamburger toggle, and scroll-spies `#skills`/`#projects`/`#orgs`/`#hobbies` to highlight the active nav link), Enter/Space keyboard activation for `.project-card`, and a click-to-enlarge lightbox for `.org-gallery img` (Escape/backdrop/close-button dismiss). Nav links and the scroll-spy section list are hardcoded to `index.html`'s four section IDs — adding or renaming a section on the landing page means updating both in `buildNav()`.
- **`Images/`**, **`Movies/`**, **`Files/`** — static assets referenced by relative path from the HTML (photos/screenshots, video demos, and the resume PDF). New assets go in the matching folder and are referenced with a relative `Images/...`, `Movies/...`, or `Files/...` path.

## Conventions

- Pages are linked with relative paths (e.g. `Project_Template1.html`, `Images/foo.png`) since this is served as a static site from the repo root — keep new links relative, not absolute.
- Fonts (Cormorant Garamond, Barlow, Barlow Condensed) and Phosphor Icons are both loaded via CDN `<link>`/`<script>` tags in each page's `<head>`; new pages should include the same tags for consistent styling/icons.
- HTML comments like `<!-- 🖊️ PLACEHOLDER: ... -->` and `<!-- 📸 PLACEHOLDER: ... -->` mark spots meant for content/image swaps — preserve this pattern when scaffolding new project pages.
