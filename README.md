# M-Cell Archive — Delta Green Campaign Wiki

A gitbook-style tracker for our Delta Green campaign, built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Getting Started (in VS Code)

1. Open this folder in VS Code.
2. Open a terminal (`` Ctrl+` `` / `` Cmd+` ``) and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the local URL it prints (usually `http://localhost:4321`) in your browser.
4. Leave `npm run dev` running — the site auto-reloads as files change.

## Adding / Updating Content

Everything lives under `src/content/docs/` as plain Markdown files, organized by type:

```
src/content/docs/
  characters/   ← the 5 PC agents
  npcs/
    delta-green/         ← Delta Green personnel
    bonds/                ← agents' personal relationships
    suspects-witnesses/   ← case-related NPCs
  cases/        ← one page per case (e.g. Operation ALICE)
  sessions/     ← one page per session log
  evidence/     ← evidence locker entries
  locations/    ← key locations
  moments/      ← key moments/interactions
  mysteries/    ← unresolved threads
  timeline.md   ← chronological case timeline
```

Each file starts with frontmatter (the `---` block at the top) with fields like `title`, `status`, `sessions`, `tags`, `case`. The sidebar updates automatically based on the folder structure — no need to edit navigation config for new pages.

After each session, hand the new summary to Claude (or Claude Code) and it will create/update the relevant Markdown files across these folders and cross-link them. `CLAUDE.md` documents the full conventions.

## Going live on GitHub Pages

This project is pre-configured to deploy automatically via GitHub Actions on every push to `main`, to **[davidevantosh/deltagreen](https://github.com/davidevantosh/deltagreen)**.

Since `deltagreen` isn't a GitHub "user site" repo name, this deploys as a project site at `https://davidevantosh.github.io/deltagreen/` — a subpath. Astro/Starlight only auto-prefixes its *own* generated navigation with a `base` path, not the hand-written links and character portrait images throughout this wiki's markdown content (a documented upstream limitation). `astro.config.mjs` includes a small custom rehype plugin (`rehypeBasePrefix`, using `rehype-raw` + `unist-util-visit`) that fixes this at build time — every internal link and image has been verified to resolve correctly under `/deltagreen/`. You shouldn't need to touch this unless the repo is ever renamed (see below).

One-time setup:

1. **Push this project to the repo:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/davidevantosh/deltagreen.git
   git push -u origin main
   ```

2. **Enable Pages.** In the repo on GitHub: **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.

3. **Push.** The workflow in `.github/workflows/deploy.yml` builds and deploys automatically. Check the **Actions** tab for progress — the first run takes a couple of minutes. Once it's green, your site is live at `https://davidevantosh.github.io/deltagreen/`.

From then on, every `git push` to `main` (including commits made by Claude Code) redeploys the live site automatically — no manual build step needed.

### If you ever rename the repo or add a custom domain

- **Renaming the repo:** update the `BASE` constant near the top of `astro.config.mjs` to match the new name exactly (e.g. `/new-repo-name`).
- **Custom domain:** update `site` in `astro.config.mjs` to your domain, and since custom domains serve from the root (no subpath), you can also delete the `base` config and the `rehypeBasePrefix` plugin entirely at that point — they'd no longer be needed.

## Build for local testing (optional)

```bash
npm run build
npm run preview
```
