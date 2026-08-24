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

This project is pre-configured to deploy automatically via GitHub Actions on every push to `main`.

**Important: use a "user site," not a "project site."** GitHub Pages project sites (repo name ≠ `username.github.io`) serve from a subpath like `/delta-green-wiki/`, which requires every internal link and image in this project to be prefixed to match. Astro/Starlight only does this automatically for its own auto-generated navigation — not for the hand-written cross-links throughout this wiki's content — so a project site would silently 404 on nearly every link and portrait image. A **user site** avoids this entirely by serving at the domain root, with zero link changes needed. That's what this project is set up for.

One-time setup:

1. **Update the site URL.** In `astro.config.mjs`, replace `YOUR-USERNAME` with your actual GitHub username:
   ```js
   site: 'https://YOUR-USERNAME.github.io',
   ```

2. **Create a GitHub repo named exactly `YOUR-USERNAME.github.io`** (this exact name is required for a user site — see [github.com/new](https://github.com/new)). Note: GitHub allows only **one** user site per account — if you already use `username.github.io` for something else, see the alternative below instead.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   git push -u origin main
   ```

3. **Enable Pages.** In the repo on GitHub: **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.

4. **Push.** The workflow in `.github/workflows/deploy.yml` builds and deploys automatically. Check the **Actions** tab for progress — the first run takes a couple of minutes. Once it's green, your site is live at `https://YOUR-USERNAME.github.io/`.

From then on, every `git push` to `main` (including commits made by Claude Code) redeploys the live site automatically — no manual build step needed.

### Alternative: if you need a differently-named repo

If `username.github.io` is already taken by another project, two options avoid the same subpath problem:
- **Get a custom domain** (a few dollars/year) and point it at a project site — custom domains also serve from the root, so no link changes are needed either.
- **Fix every internal link to work under a subpath** — possible, but means going through and prefixing several hundred hand-written links and image tags throughout `src/content/docs/`. Not recommended unless you have a specific reason to avoid a user site or custom domain.

## Build for local testing (optional)

```bash
npm run build
npm run preview
```
