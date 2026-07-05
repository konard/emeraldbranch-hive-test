# Hive Test Website Constructor

This repository is a lightweight Astro website factory for premium local-business landing pages. The generated page is assembled from structured client facts, a design direction, media assets, ordered section configuration, and future automation settings.

## Source Of Truth

- `src/config/client.ts`: business facts, service area, trust signals, and services.
- `src/config/design.ts`: design direction tokens and default section variants. It references `GET_DESIGN.md`.
- `src/config/page.ts`: ordered sections, copy, section variants, media placement, and integration settings.
- `src/lib/site-builder.ts`: validation and resolution from raw config to the renderable site model.
- `src/components/sections/`: reusable section templates consumed by the page config.

Generated output should not become the source of truth. Change the config files, then rebuild.

## Commands

```bash
npm install
npm test
npm run build
npm run dev
```

## Operator Workflow

1. Edit `src/config/client.ts` for the new business.
2. Add image or video entries to `mediaLibrary` in `src/config/page.ts`.
3. Reorder, remove, or add entries in the `sections` array.
4. Choose section variants with `variant`, or let `src/config/design.ts` provide defaults.
5. Put media in exact sections with `media: [{ assetId, placement, overlay }]`.
6. Add future integration values under `integration` for forms, booking, n8n, chatbot, or CRM routing.
7. Keep unresolved launch items in `needsFacts`; they are exposed in the rendered page as machine-readable JSON with the `operator-pending-facts` script tag.

## Supported Section Types

- `hero`: full-bleed media or split-media first impression.
- `services`: service grid or media-led list.
- `media-feature`: image or video feature with left, right, inline, or full-bleed placement.
- `proof`: stats, trust signals, and supporting media.
- `gallery`: editorial pair or full-bleed grid.
- `lead`: automation-ready form and booking surface.

## Verification

The unit tests in `tests/site-builder.test.ts` check that the constructor:

- preserves configured section order;
- applies design default variants;
- resolves image and video media slots;
- rejects duplicate section IDs;
- rejects unknown media references;
- keeps missing real-business facts visible for operators and agents.
