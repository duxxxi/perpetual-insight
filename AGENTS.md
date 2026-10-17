# Project Architecture

- Adapt external dashboard presentation to TanStack without importing Next.js or its authenticated API stack; source account data and live actions must not be represented as copied.
- Mount the workspace Ask Perpetuity dock once in the root, excluding public storytelling pages; reuse the bottom-sheet conversation surface for existing Threads entry points.
- Keep workspace main-content trailing scroll clearance in the shared canvas CSS so every page's final controls can clear the fixed dock and blur; do not add inline replacement chat bars.
- Compose the preview conversation with AI Elements and existing local preview stores; clearly distinguish simulated replies from live agent execution.
- Reuse exchange-clock logic with distinct public and workspace presentations and one hydrated clock per page; keep workspace theme independent of local day/night and its exchange list separate from About's.
- Apply workspace canvas tokens on the root body by route so portalled dialogs inherit the same theme as all operational pages; keep public storytelling palettes independent. Use semantic pill tones to distinguish action categories without changing behavior.

- Public company storytelling lives on dedicated routes linked from `/landing`; keep the operational sidebar focused on workspace tools.
- Scope public About visual tokens to `.about-painted` so its art direction does not alter operational workspace themes.
- Keep About's video and page palette fixed independently of local time and workspace theme; time updates only its exchange clocks and horizon so the public appearance stays stable.
- Feed About's four exchange clocks and horizon from the same second-updating hydrated page clock; use timezone-aware regular-session schedules, not claims of live holiday-aware exchange status, so the marker advances with local time.
- Share public landing feature copy and demonstration data through a browser-safe content module; this keeps the original landing and painted presentation aligned without duplicating claims.
- Keep About's two video comparison choices in page-session state with one selected video for all times; share media rendering, pause hidden/reduced-motion videos, and preserve the local-time clock and original landing page.