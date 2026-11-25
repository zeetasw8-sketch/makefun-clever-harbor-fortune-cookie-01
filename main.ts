import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(dir, "line.txt"), "utf8");
const line = raw.replace(/\r?\n$/, "");

if (!line.trim()) {
  throw new Error("line.txt is empty or only whitespace");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("line.txt must be a single line");
}
if (line.length < 1 || line.length > 160) {
  throw new Error(`line must be 1-160 characters (got ${line.length})`);
}
const words = line.trim().split(/\s+/);
if (words.length > 20) {
  throw new Error(`line must be at most 20 words (got ${words.length})`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
