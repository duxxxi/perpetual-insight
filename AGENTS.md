# Project Architecture

- Adapt external dashboard presentation to TanStack without importing Next.js or its authenticated API stack; source account data and live actions must not be represented as copied.
- Mount the workspace Ask Perpetuity dock once in the root, excluding public storytelling pages; reuse the bottom-sheet conversation surface for existing Threads entry points.
- Compose the preview conversation with AI Elements and existing local preview stores; clearly distinguish simulated replies from live agent execution.
- Reuse exchange-clock logic with distinct public and workspace presentations and one hydrated clock per page; keep workspace theme independent of local day/night and its exchange list separate from About's.
- Apply workspace canvas tokens on the root body by route so portalled dialogs inherit the same theme as all operational pages; keep public storytelling palettes independent. Use semantic pill tones to distinguish action categories without changing behavior.

- Public company storytelling lives on dedicated routes linked from `/landing`; keep the operational sidebar focused on workspace tools.
- Scope public About visual tokens to `.about-painted` so its art direction does not alter operational workspace themes.
- Resolve About's day/night imagery after hydration using viewer-local time, with shared period logic and reduced-motion-aware CSS; this keeps SSR stable and workspace theme settings independent.
- Feed About's four exchange clocks and horizon from the same second-updating hydrated page clock as its background; use timezone-aware regular-session schedules, not claims of live holiday-aware exchange status, so the marker advances with local time.
- Drive About's skyline and semantic palette blend from one browser-safe local-time function; use page-scoped native cursor assets for fine pointers with standard cursor fallbacks to avoid tracking lag and preserve interaction cues.
- Share public landing feature copy and demonstration data through a browser-safe content module; this keeps the original landing and painted presentation aligned without duplicating claims.
- Keep About background comparison choices in page-session state with independently selectable day/night image or CDN video assets; share media rendering, pause hidden/reduced-motion videos, and preserve the local-time clock and original landing page.