# G3O — Global Government GenAI Observatory

Prototype website for the G3O project, a cross-national measurement initiative tracking governmental adoption of generative AI worldwide.

## Quick Start

```bash
npm install --legacy-peer-deps
npm run generate:data
npm run dev        # Start dev server
npm run build      # Production build → dist/
npm run preview    # Preview production build
```

## Site Structure

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, global stats, world map, project overview, CTAs |
| `/dashboard` | Explore Data | Hierarchical filters → institution profile → peer comparison |
| `/about` | About G3O | Mission, scope, transparency, methodology overview |
| `/team` | Team | PI cards, research assistants |
| `/funding` | Funding | Supporters, independence disclaimer |
| `/research` | Research | Internal/external research, symposium announcement |
| `/policy` | Policy | Best practices, cases, legislative template, disclosure template |
| `/data-access` | Data Access | API docs, methods, provenance, ethics |
| `/faq` | FAQ | Accordion-based FAQ |
| `/contact` | Contact | Contribution forms, error reporting, collaboration |

## Key Components

```
src/
├── components/
│   ├── layout/        Header, Footer, Layout (shared shell)
│   ├── home/          Hero, StatCounters, GlobalMap, ProjectOverview,
│   │                  FeaturedCards, CallForContributions, NewsStrip
│   ├── dashboard/     FilterPanel, InstitutionProfile, ComparisonPanel
│   └── common/        SectionHeading, ContentCard, TeamCard,
│                      FAQAccordion, CTABlock
├── pages/             One file per route
├── data/              Mock data (institutions, team, research, policy,
│                      funders, faq)
└── i18n/              i18next setup + English locale
```

## Data Sources

The dashboard now uses a generated dataset in `src/data/pilotDashboardData.json`.

- **pilotDashboardData.json** — generated from `g3o_full_database_v1.csv` and filled from `master_institutions.csv`
- **scripts/generatePilotData.mjs** — local generator for refreshing the committed dashboard dataset
- **institutions.js** — remaining homepage/dashboard legacy mock data still used outside the merged dashboard flow
- **team.js** — team members, research assistants
- **research.js** — internal/external papers, symposium info
- **policy.js** — best practices, highlighted cases, legislative template, disclosure template
- **funders.js** — funders, independence note
- **faq.js** — FAQ items

## What's Ready vs. Placeholder

| Feature | Status |
|---------|--------|
| Site structure and navigation | Ready |
| All 10 pages with content | Ready |
| World map with country highlighting | Ready (mock data) |
| Dashboard filter → profile → comparison flow | Ready (pilot CSV + master structure fill) |
| Legislative template and disclosure template | Ready (draft content) |
| API documentation | Placeholder (example endpoints) |
| i18n architecture | Ready (English only) |
| Contribution/error report forms | Placeholder (links to email) |
| Team photos | Placeholder (initials avatars) |

## Tech Stack

- **Vite** — Build tool
- **React 19** — UI framework
- **React Router 7** — Client-side routing
- **Tailwind CSS 4** — Styling
- **react-simple-maps** — World map visualization
- **react-i18next** — Internationalization
- **GitHub Pages** — Deployment target

## Next Steps

1. **Live data**: Replace `src/data/` mock files with API calls to the G3O backend
2. **API documentation**: Generate proper API docs (OpenAPI/Swagger) when endpoints are live
3. **Localization**: Add translation files for additional languages in `src/i18n/locales/`
4. **Map interactivity**: Add click-to-drill-down from map countries to dashboard filtered view
5. **Contribution forms**: Wire contact/contribution forms to a backend or form service
6. **GitHub Pages deployment**: Workflow is present; commit regenerated `src/data/pilotDashboardData.json` before push
7. **Team photos**: Add actual team member photos to `public/` and reference in `src/data/team.js`
8. **Search**: Add full-text search across institutions
9. **Real stat counters**: Connect homepage counters to live database counts

## Deployment

The site is configured for GitHub Pages with `base: '/g3o-website/'` in `vite.config.js`. The GitHub Actions workflow deploys on push to `main`.

Local refresh flow:

```bash
npm run generate:data
npm run build
# Commit and push to main
```

If the source CSVs are not available on the machine running the build, the generator keeps the committed `src/data/pilotDashboardData.json` in place so GitHub Pages can still deploy successfully.
