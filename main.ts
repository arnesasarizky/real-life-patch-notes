import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Real-Life Patch Notes: one single-line changelog entry for a body bug.
// The knees were fixed in v2.4.1; the notification simply moved elsewhere.
const SEGMENTS = [
  "v2.4.1 — Fixed: knees no longer announce themselves",
  "when standing after 35.",
  "Side effect: the notification has been relocated",
  "to the lower back.",
];

const ENTRY = SEGMENTS.join(" ");

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "entry.txt";

// Gate: UTF-8 text, 1-160 characters, not only whitespace, one line.
const MAX_CHARS = 160;

function checkEntry(text: string): void {
  if (text.length === 0 || text.trim().length === 0) {
    throw new Error("Entry must not be empty or only whitespace.");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `Entry is ${text.length} characters, over the ${MAX_CHARS} limit.`,
    );
  }
  if (text.includes("\n")) {
    throw new Error("Entry must be a single line.");
  }
}

function main(): void {
  checkEntry(ENTRY);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, OUTPUT_FILE), ENTRY, "utf8");
}

main();
