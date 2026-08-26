# M-Cell Archive — Project Instructions

This is a Delta Green (Lovecraftian FBI horror TTRPG) campaign wiki, built with Astro + Starlight. Its purpose is to track the campaign across sessions: main characters, NPCs, evidence, locations, key moments, and unresolved mysteries.

## Your main job

After each game session, the user will paste in a written session summary (sometimes as pasted text, sometimes as an uploaded .txt file) and ask you to update the wiki. When that happens:

1. **Read the summary carefully** and extract every distinct entity: new PCs (rare), new NPCs, new/updated locations, new evidence, new key moments/interactions, and any open questions or unresolved threads.
2. **Check existing content first** (`src/content/docs/**`) before creating anything — if a character, NPC, location, etc. already has a page, UPDATE it (append a new dated section, update `sessions` array, update `status` if changed) rather than creating a duplicate page.
3. **Create new pages** for genuinely new entities, following the schema and conventions below.
4. **Cross-link liberally.** Every NPC/location/evidence/moment mentioned on a page should be a markdown link to its own page, e.g. `[Agent Mabel](/characters/mabel/)`.
5. **Update the session's own log page** (`src/content/docs/sessions/session-NN.md`) with a full summary + timeline, linking out to everything introduced/touched that session.
6. **Update the relevant case page** (`src/content/docs/cases/`) — add a line to its Progress Log (at the bottom of the page) pointing at the new session, and update its Status if the case's state has changed.
7. **Update `src/content/docs/timeline.md`** with any new dated evidence or events (anything with a specific in-world date — receipts, permits, letters, tickets).
8. **Update `src/content/docs/index.md`** if the roster, current case, or session count changed.
9. After editing, run `npm run build` to confirm there are no broken schema/content errors before telling the user you're done.

Don't ask the user to manually specify which files to touch — infer it from the summary and make the edits yourself. Summarize what you created/changed at the end in a short list.

## Content structure & schema

All wiki content lives under `src/content/docs/`, organized into folders by entity type. The schema is defined in `src/content.config.ts` (Starlight's `docs` collection, extended). Every page needs Starlight's built-ins (`title`, `description`) plus these optional custom fields:

| Field | Type | Meaning |
|---|---|---|
| `entryType` | enum | `overview \| character \| npc \| case \| session \| evidence \| location \| moment \| mystery` |
| `status` | string | Free text — meaning depends on entryType (e.g. "Active"/"Missing"/"Deceased" for people, "Open"/"Resolved" for mysteries, "Destroyed"/"Recovered" for evidence) |
| `tags` | string[] | Short chips, e.g. `[unnatural, investigation, combat, social]` |
| `case` | string | Which case this belongs to, e.g. "Operation ALICE" |
| `sessions` | number[] | All session numbers this entity appears in or is relevant to — always append, never overwrite, when updating an existing page |
| `inGameDate` | string | In-fiction date/time, e.g. "Thu 10 Aug 1995, 4:45 PM" |
| `evidenceDate` | string | For evidence entries only — a specific real in-world date attached to the item (a receipt, permit, ticket, letter). Add it to `timeline.md` too. |
| `deceased` | boolean | For NPCs only — set `true` if confirmed or strongly presumed dead. Pair with a `sidebar.label` override ending in "💀" (see NPC conventions below). |

Folders:

```
src/content/docs/
  index.md          <- homepage: roster, cases table, quick links. Keep in sync.
  timeline.md        <- chronological case timeline built from evidenceDate fields. Update when new dated evidence appears.
  characters/         <- the 5(ish) PC agents. One file each, filename = agent's short name (e.g. mortimer.md)
  npcs/
    delta-green/      <- Delta Green personnel (handlers, other cells, agency contacts)
    bonds/            <- personal relationships of the PC agents (family, friends, partners, coworkers)
    suspects-witnesses/ <- case-related NPCs: tenants, suspects, historical figures, anyone tied to the investigation itself
  cases/              <- one page per case (e.g. operation-alice.md). Has a "Progress Log" section at the BOTTOM of the page - append, don't rewrite. Has a "Status" section near the TOP (Open/In Progress/Closed).
  sessions/           <- one page per session, filename session-NN.md (zero-padded, e.g. session-02.md)
  evidence/<case-slug>/    <- one page per distinct piece of evidence, nested under the case it belongs to (e.g. evidence/operation-alice/farsi-receipt.md). If the evidence has a specific date attached, set `evidenceDate` frontmatter and add it to timeline.md.
  locations/<case-slug>/  <- one page per key location, nested under its case
  moments/<case-slug>/    <- one page per key moment/interaction, nested under its case, kebab-case filename
  mysteries/          <- unresolved threads. NOT nested by case (mysteries often span multiple cases/decades). Has a "Status" field (Open / Partially Resolved / Resolved). When something resolves a mystery, update its status and link to the resolving moment/session - don't delete the page.
```

**Case slugs currently in use:** `operation-alice`, `the-baughman-sweep`, `operation-convergence`, `operation-india-moon`. When a new case starts, create its subfolder under `evidence/`, `locations/`, and `moments/`, plus a new page in `cases/`, and add matching entries to the `sidebar` groups for Evidence Locker / Locations / Key Moments in `astro.config.mjs` (see Sidebar section below — these three sections do NOT autogenerate case subfolders automatically, they're explicitly listed).

## Character page template

Character pages (`src/content/docs/characters/*.md`) follow a fixed structure — **do not reorder these sections**:

1. Frontmatter, then an `<img>` tag immediately after it, floated right: `<img src="/characters/NAME.png" alt="Agent NAME" style="float:right; width:200px; border-radius:8px; margin:0 0 1rem 1.5rem;" />`. If a new portrait image is provided for a character, save it to `public/characters/NAME.png`.
2. `## Overview`
3. `## Injuries & Ailments` — physical injuries, trauma, psychological effects, ongoing conditions. Update every session something happens to the character. If nothing has happened yet, state that plainly rather than omitting the section.
4. `## Relationships`
5. `## Home`
6. `## Session Notes` — **always last**. One `### Session N` subsection per session the character appeared in, in order. This is the one section that grows every update; everything else above it is a living summary, not a session-by-session log.

## NPC page conventions

- Every NPC page needs a `status` frontmatter field. For NPCs who are confirmed or strongly presumed dead, also set `deceased: true` in frontmatter AND add a `sidebar: { label: "Name 💀" }` override so the skull appears in the left-hand nav without cluttering the page's actual title. Example:
  ```yaml
  title: NPC Name
  sidebar:
    label: "NPC Name 💀"
  status: Deceased (or "Presumed deceased" if not 100% certain)
  deceased: true
  ```
- Categorize every new NPC into exactly one of the three subfolders (delta-green / bonds / suspects-witnesses) based on their relationship to the story — Bonds specifically means a supportive/personal relationship of a PC agent, not just "someone personally connected."

## Other conventions

- **Filenames:** kebab-case, no dates in the filename (dates go in frontmatter). Sessions are `session-01.md`, `session-02.md`, etc.
- **Links:** always absolute from site root, trailing slash, matching folder structure: `/characters/mabel/`, `/npcs/bonds/abad/`, `/npcs/suspects-witnesses/thomas-manuel/`, `/evidence/hidden-microphone/`.
- **Evidence pages** have: Description, Chain of Custody (append new custody events), Significance. Add `evidenceDate` frontmatter for anything with a specific date.
- **Location pages** have: Overview, Session N Notes, Open Threads.
- **Moment pages** are short — a paragraph or two of narrative plus a Participants line. Don't overwrite past moments; each moment is session-specific and permanent.
- **Mystery pages** have: What Happened, Why It's Flagged, Current Theories, Status. Update Current Theories and Status as the campaign progresses; never delete an entry even once resolved.
- **Case pages** have Status near the top and Progress Log at the bottom — everything else (Briefing, Objectives, Key Locations, Evidence, Open Threads) goes in between.

## Sidebar

The sidebar (`astro.config.mjs`) is ordered: Campaign Overview, Main Characters, NPCs, Cases, Timeline, Evidence Locker, Locations, Key Moments, Mysteries & Loose Threads, Sessions. Keep this order when editing.

Most sections use `autogenerate` per folder, so new files there automatically appear in navigation. The exceptions are **Evidence Locker**, **Locations**, and **Key Moments** — these are explicitly split into one nested group per case (Operation ALICE, The Baughman Sweep, Operation CONVERGENCE, Operation INDIA MOON), so a brand-new case requires manually adding a new nested group to each of those three sidebar sections in `astro.config.mjs`, pointing `autogenerate.directory` at the new `evidence/<case-slug>/`, `locations/<case-slug>/`, `moments/<case-slug>/` folder.

The site logo (`src/assets/delta-green-logo.png`) replaces the text title in the top nav bar (`logo.replacesTitle: true` in the Starlight config) and is also used as the homepage hero image (`template: splash` + `hero.image` in `index.md`'s frontmatter) — don't reintroduce a plain text "M-Cell Archive" or similar heading on the homepage; the logo does that job now. The right-hand "on this page" table of contents is disabled site-wide (`tableOfContents: false`) — don't re-enable it per-page.

## Deployment — the base path is handled, don't break the fix

This project deploys to `https://davidevantosh.github.io/deltagreen/` — a GitHub Pages **project site**, which requires the `base: '/deltagreen'` config in `astro.config.mjs`. Astro/Starlight only auto-prefixes its own generated navigation with `base` — not hand-written links or `<img>` tags inside markdown content (a documented upstream limitation). To work around this, `astro.config.mjs` includes a custom rehype plugin (`rehypeBasePrefix`, paired with `rehype-raw` so it can see raw HTML like the character portrait `<img>` tags) that rewrites every root-relative link and image at build time.

This means: **keep writing links and image paths exactly as before** — root-relative, e.g. `/characters/mortimer/` and `/characters/mortimer.png` — the plugin handles the rest automatically. Do not manually prefix new links with `/deltagreen` yourself; that would cause double-prefixing. Do not remove `rehypeRaw`, `rehypeBasePrefix`, or the `base` config without understanding why they're there (see the comment block above them in `astro.config.mjs`).

## Dev workflow

- `npm run dev` — local dev server with hot reload, use this while iterating
- `npm run build` — production build; run this as a sanity check after batch edits to catch broken links/schema errors before handing back to the user
