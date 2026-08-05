// Editable layer over the static company-memory pages.
// Every piece of text on the Context page can be corrected in place; edits are
// stored as overrides keyed by page + field path and persisted locally so the
// memory survives reloads.

import { useEffect, useState } from "react";
import { wikiById, type WikiPage } from "./wiki";

const KEY = "perpetuity.memory.edits.v1";

type Overrides = Record<string, string>;

let overrides: Overrides = {};
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) overrides = JSON.parse(raw) as Overrides;
  } catch {
    overrides = {};
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(overrides));
  } catch {
    /* ignore */
  }
}

export function setFact(path: string, value: string) {
  load();
  overrides[path] = value;
  persist();
  listeners.forEach((l) => l());
}

export function resetFact(path: string) {
  load();
  delete overrides[path];
  persist();
  listeners.forEach((l) => l());
}

/** Apply stored overrides on top of a page definition. */
function withEdits(page: WikiPage, o: Overrides): { page: WikiPage; edits: number } {
  let edits = 0;
  const pick = (path: string, fallback: string) => {
    const v = o[`${page.id}/${path}`];
    if (v === undefined) return fallback;
    if (v !== fallback) edits += 1;
    return v;
  };

  const next: WikiPage = {
    ...page,
    summary: pick("summary", page.summary),
    blocks: page.blocks.map((b, i) => {
      if (b.kind === "ul")
        return { ...b, items: b.items.map((it, j) => pick(`block.${i}.item.${j}`, it)) };
      if (b.kind === "callout")
        return {
          ...b,
          title: pick(`block.${i}.title`, b.title),
          text: pick(`block.${i}.text`, b.text),
        };
      return { ...b, text: pick(`block.${i}.text`, b.text) };
    }),
    infobox: page.infobox
      ? {
          ...page.infobox,
          rows: page.infobox.rows.map((r, i) => ({
            ...r,
            value: pick(`infobox.${i}`, r.value),
          })),
        }
      : undefined,
  };

  return { page: next, edits };
}

export function useMemoryPage(id: string) {
  const [, force] = useState(0);

  useEffect(() => {
    load();
    const l = () => force((n) => n + 1);
    listeners.add(l);
    l();
    return () => {
      listeners.delete(l);
    };
  }, []);

  const base = wikiById(id);
  if (!base) return null;
  return withEdits(base, overrides);
}
