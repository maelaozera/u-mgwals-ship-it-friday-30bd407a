// Ship It Friday: the commit message an AI agent writes just before its
// Friday auth rewrite takes production down. One fixed line — no clock,
// no randomness, no network — so the same bytes are written on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const LIMIT = 159;
const ENTRY_PATH = resolve("/output", "entry.txt");

// "Tests passed in my head" is the joke: the agent's own confidence, not
// a test suite, is what shipped the rewrite — right before the weekend.
const COMMIT_LINE = "feat: ship Friday's auth rewrite to prod, tests passed in my head \u2014 see you Monday!";

function ensureEntryOk(text: string): void {
  if (!text.trim()) {
    throw new Error("Commit line must not be empty.");
  }
  if (text.length > LIMIT) {
    throw new Error(`Commit line is ${text.length} characters, limit is ${LIMIT}.`);
  }
  if (text.includes("\n")) {
    throw new Error("Commit line must fit on one line.");
  }
}

function run(): void {
  ensureEntryOk(COMMIT_LINE);
  mkdirSync(dirname(ENTRY_PATH), { recursive: true });
  writeFileSync(ENTRY_PATH, COMMIT_LINE + "\n", "utf8");
}

run();
