// Charm the Commuter: Forecast a City That Doesn't Exist —
// one original line of weather for Muddlewick, a city that isn't.
// Broadcast register up front ("patchy fog, a 40% chance of rain"),
// then the commuter's twist: the 8:15 bus that leaves at 8:14,
// and advice to run — but make it look casual.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Muddlewick: patchy fog, a 40% chance of rain, and a 100% chance the 8:15 bus leaves at 8:14 — run, but make it look casual.";

// The gate counts characters, not bytes: count code points so the
// em dash in the entry is one character, matching the scorer.
const forecastLength = [...ENTRY].length;
if (forecastLength < 1 || forecastLength > 140) {
  throw new Error(`forecast must be 1-140 characters, got ${forecastLength}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
// Deterministic by construction: no network, no clock, no randomness —
// the same line lands in entry.txt on every run, byte for byte.
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote forecast to ${outPath} (${forecastLength} characters)`);
