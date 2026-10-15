# Project Architecture

- Adapt external dashboard presentation to TanStack without importing Next.js or its authenticated API stack; source account data and live actions must not be represented as copied.
- Mount the workspace Ask Perpetuity dock once in the root, excluding public storytelling pages; reuse the bottom-sheet conversation surface for existing Threads entry points.
- Compose the preview conversation with AI Elements and existing local preview stores; clearly distinguish simulated replies from live agent execution.
- Reuse the public clock/horizon display in the dashboard with workspace-scoped visual tokens and one hydrated clock; keep workspace theme independent of local day/night.
- Apply workspace canvas tokens on the root body by route so portalled dialogs inherit the same theme as all operational pages; keep public storytelling palettes independent. Use semantic pill tones to distinguish action categories without changing behavior.

- Public company storytelling lives on dedicated routes linked from `/landing`; keep the operational sidebar focused on workspace tools.
- Scope public About visual tokens to `.about-painted` so its art direction does not alter operational workspace themes.
- Resolve About's day/night imagery after hydration using viewer-local time, with shared period logic and reduced-motion-aware CSS; this keeps SSR stable and workspace theme settings independent.
- Feed About's exchange clocks and horizon from the same hydrated page clock as its background; use timezone-aware regular-session schedules, not claims of live holiday-aware exchange status.
- Drive About's skyline and semantic palette blend from one browser-safe local-time function; use page-scoped native cursor assets for fine pointers with standard cursor fallbacks to avoid tracking lag and preserve interaction cues.
- Share public landing feature copy and demonstration data through a browser-safe content module; this keeps the original landing and painted presentation aligned without duplicating claims.
- Keep About background comparison choices in page-session state with independently selectable day/night assets; comparison must not override its local-time clock or alter the original landing page.