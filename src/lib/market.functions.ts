import { createServerFn } from "@tanstack/react-start";

/* ---------------- Commodity / FX series (Yahoo Finance) ---------------- */

export type MarketSeries = {
  sym: string;
  name: string;
  price: number;
  currency: string;
  chgPct: number;
  up: boolean;
  points: number[];
  unit?: string;
};

const INSTRUMENTS: { sym: string; yahoo: string; name: string; unit?: string }[] = [
  { sym: "BRENT", yahoo: "BZ=F", name: "Brent crude · ICE", unit: "/bbl" },
  { sym: "COPPER", yahoo: "HG=F", name: "Copper · COMEX", unit: "/lb" },
  { sym: "WOOD", yahoo: "WOOD", name: "Timber & forestry · index" },
  { sym: "EURUSD", yahoo: "EURUSD=X", name: "Euro / US dollar" },
];

async function fetchSeries(inst: (typeof INSTRUMENTS)[number]): Promise<MarketSeries | null> {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
        inst.yahoo,
      )}?range=1mo&interval=1d`,
      { headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" } },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as any;
    const result = json?.chart?.result?.[0];
    if (!result) return null;
    const closes: number[] = (result.indicators?.quote?.[0]?.close ?? []).filter(
      (n: number | null) => typeof n === "number",
    );
    if (closes.length < 3) return null;
    const price: number = result.meta?.regularMarketPrice ?? closes[closes.length - 1];
    const prev = closes[closes.length - 2];
    const chgPct = prev ? ((price - prev) / prev) * 100 : 0;
    return {
      sym: inst.sym,
      name: inst.name,
      unit: inst.unit,
      price,
      currency: result.meta?.currency ?? "USD",
      chgPct,
      up: chgPct >= 0,
      points: closes.slice(-24),
    };
  } catch {
    return null;
  }
}

export const getMarketSignals = createServerFn({ method: "GET" }).handler(async () => {
  const series = await Promise.all(INSTRUMENTS.map(fetchSeries));
  return {
    fetchedAt: new Date().toISOString(),
    series: series.filter((s): s is MarketSeries => Boolean(s)),
  };
});

/* ---------------- Polymarket odds (Gamma API) ---------------- */

export type PolyOdds = {
  question: string;
  event: string;
  prob: number;
  chg24h: number | null;
  volume24h: number | null;
  url: string;
};

const POLY_QUERIES = [
  "fed decision",
  "tariff",
  "recession",
  "oil price",
  "ecb",
];

export const getPolymarketOdds = createServerFn({ method: "GET" }).handler(async () => {
  const collected: PolyOdds[] = [];

  await Promise.all(
    POLY_QUERIES.map(async (q) => {
      try {
        const res = await fetch(
          `https://gamma-api.polymarket.com/public-search?q=${encodeURIComponent(
            q,
          )}&limit_per_type=4&events_status=active`,
          { headers: { Accept: "application/json" } },
        );
        if (!res.ok) return;
        const json = (await res.json()) as any;
        for (const event of json?.events ?? []) {
          const vol = Number(event?.volume24hr ?? 0);
          for (const m of event?.markets ?? []) {
            if (m?.closed || m?.active === false) continue;
            let prices: number[] = [];
            try {
              prices = JSON.parse(m?.outcomePrices ?? "[]").map(Number);
            } catch {
              continue;
            }
            const prob = Math.round((prices[0] ?? 0) * 100);
            if (prob <= 2 || prob >= 98) continue;
            collected.push({
              question: m?.question ?? event?.title ?? "",
              event: event?.title ?? "",
              prob,
              chg24h:
                typeof m?.oneDayPriceChange === "number"
                  ? Math.round(m.oneDayPriceChange * 100)
                  : null,
              volume24h: Number.isFinite(vol) ? vol : null,
              url: `https://polymarket.com/event/${event?.slug ?? ""}`,
            });
          }
        }
      } catch {
        /* ignore a single failing query */
      }
    }),
  );

  const seen = new Set<string>();
  const perEvent = new Map<string, number>();
  const markets = collected
    .sort((a, b) => (b.volume24h ?? 0) - (a.volume24h ?? 0))
    .filter((m) => {
      if (!m.question || seen.has(m.question)) return false;
      const used = perEvent.get(m.event) ?? 0;
      if (used >= 1) return false;
      perEvent.set(m.event, used + 1);
      seen.add(m.question);
      return true;
    })
    .slice(0, 5);

  return { fetchedAt: new Date().toISOString(), markets };
});
