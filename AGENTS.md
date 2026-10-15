# Project Architecture

- Public company storytelling lives on dedicated routes linked from `/landing`; keep the operational sidebar focused on workspace tools.
- Scope public About visual tokens to `.about-painted` so its art direction does not alter operational workspace themes.
- Resolve About's day/night imagery after hydration using viewer-local time, with shared period logic and reduced-motion-aware CSS; this keeps SSR stable and workspace theme settings independent.
- Feed About's exchange clocks and horizon from the same hydrated page clock as its background; use timezone-aware regular-session schedules, not claims of live holiday-aware exchange status.
- Drive About's skyline and semantic palette blend from one browser-safe local-time function; use page-scoped native cursor assets for fine pointers with standard cursor fallbacks to avoid tracking lag and preserve interaction cues.
- Share public landing feature copy and demonstration data through a browser-safe content module; this keeps the original landing and painted presentation aligned without duplicating claims.
- Keep About background comparison choices in page-session state with independently selectable day/night assets; comparison must not override its local-time clock or alter the original landing page.