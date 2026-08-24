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
  index.md          <- homepage: roster, current case, quick links. Keep in sync.
  timeline.md        <- chronological case timeline built from evidenceDate fields. Update when new dated evidence appears.
  characters/         <- the 5(ish) PC agents. One file each, filename = agent's short name (e.g. mortimer.md)
  npcs/
    delta-green/      <- Delta Green personnel (handlers, other cells, agency contacts)
    bonds/            <- personal relationships of the PC agents (family, friends, partners, coworkers)
    suspects-witnesses/ <- case-related NPCs: tenants, suspects, historical figures, anyone tied to the investigation itself
  cases/              <- one page per case (e.g. operation-alice.md). Has a "Progress Log" section at the BOTTOM of the page - append, don't rewrite. Has a "Status" section near the TOP (Open/In Progress/Closed).
  sessions/           <- one page per session, filename session-NN.md (zero-padded, e.g. session-02.md)
  evidence/           <- one page per distinct piece of evidence. If the evidence has a specific date attached (a receipt, ticket, letter, permit, etc.), set the `evidenceDate` frontmatter field and add it to timeline.md.
  locations/          <- one page per key location
  moments/            <- one page per key moment/interaction, kebab-case title as filename
  mysteries/          <- unresolved threads. Has a "Status" field (Open / Partially Resolved / Resolved). When something resolves a mystery, update its status and link to the resolving moment/session - don't delete the page.
```

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

The sidebar (`astro.config.mjs`) uses `autogenerate` per folder, so new files automatically appear in navigation — you don't need to touch `astro.config.mjs` when adding pages, only if adding a whole new top-level category or NPC subfolder. The right-hand "on this page" table of contents is disabled site-wide (`tableOfContents: false`) — don't re-enable it per-page.

## Deployment — do not add a `base` path

This project is deployed as a GitHub Pages **user site** (`astro.config.mjs` sets `site` only, no `base`) specifically so that every hand-written link and image `src` in this wiki (all root-relative, e.g. `/characters/mortimer/`) resolves correctly. If a `base` path is ever added to `astro.config.mjs`, every one of those hand-written links will silently break, because Astro/Starlight only auto-prefixes its own generated navigation with `base` — not links written directly in markdown content. Don't add `base` unless you also rewrite every internal link and image path in `src/content/docs/**` to account for it.

## Dev workflow

- `npm run dev` — local dev server with hot reload, use this while iterating
- `npm run build` — production build; run this as a sanity check after batch edits to catch broken links/schema errors before handing back to the user
