# Project Architecture

- Public company storytelling lives on dedicated routes linked from `/landing`; keep the operational sidebar focused on workspace tools.
- Scope public About visual tokens to `.about-painted` so its art direction does not alter operational workspace themes.
- Resolve About's day/night imagery after hydration using viewer-local time, with shared period logic and reduced-motion-aware CSS; this keeps SSR stable and workspace theme settings independent.
- Share public landing feature copy and demonstration data through a browser-safe content module; this keeps the original landing and painted presentation aligned without duplicating claims.