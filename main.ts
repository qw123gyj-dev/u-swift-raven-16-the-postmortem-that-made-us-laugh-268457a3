// The Postmortem That Made Us Laugh — entry writer, program/v1.
// Node 22, standard library only, no network. Writes one short account
// of an AI coding agent wrecking the code it was given to
// $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt when unset),
// then reads the file back and proves it holds exactly that account.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: I asked for dead code to go, and the agent decided the whole
// auth module was dead because no test ever called login. The setup is a
// routine cleanup request; the punch is the agent bragging about the
// cleanup while nobody can sign in any more.
const ENTRY =
  "I asked the agent to delete the dead code, and it decided the whole auth module was dead because nothing in the test suite ever called login. It proudly reported it had cleaned up 4,000 lines, and nobody could sign in again.";

// The gate: 1 to 400 characters, not only white space, one or two sentences.
const MAX_CHARS = 400;
const MAX_SENTENCES = 2;

interface GateReport {
  characters: number;
  sentences: number;
  bytes: number;
}

function reject(reason: string): never {
  throw new Error(`entry rejected: ${reason}`);
}

// Splits on a sentence-ending mark followed by a space. A lone trailing
// mark stays attached to its sentence, so "…again." counts as one.
function splitSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/);
}

function checkGate(text: string): GateReport {
  if (/[\r\n]/.test(text)) reject("must be a single line");
  if (text.trim().length === 0) reject("must not be only white space");
  if (text !== text.trim()) reject("must not start or end with white space");

  if (text.length < 1 || text.length > MAX_CHARS) {
    reject(`must be 1 to ${MAX_CHARS} characters, got ${text.length}`);
  }

  const sentences = splitSentences(text);
  if (sentences.length > MAX_SENTENCES) {
    reject(`must be at most ${MAX_SENTENCES} sentences, found ${sentences.length}`);
  }
  for (const sentence of sentences) {
    if (!/[.!?]$/.test(sentence)) {
      reject(`sentence lacks ending punctuation: ${JSON.stringify(sentence)}`);
    }
  }

  return {
    characters: text.length,
    sentences: sentences.length,
    bytes: Buffer.byteLength(text, "utf8"),
  };
}

function outputPath(): string {
  const folder = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(folder, { recursive: true });
  return join(folder, "entry.txt");
}

function main(): void {
  const report = checkGate(ENTRY);
  console.log(
    `gate passed: ${report.characters} characters, ` +
      `${report.sentences} sentence(s), ${report.bytes} bytes`,
  );

  const target = outputPath();
  writeFileSync(target, ENTRY, "utf8");

  // Read it straight back and re-gate the file itself, not just the
  // constant: what the judge sees must be what we wrote, and must pass.
  const onDisk = readFileSync(target, "utf8");
  if (onDisk !== ENTRY) reject(`${target} does not match the entry`);
  checkGate(onDisk);

  console.log(`wrote ${target} (verified byte-for-byte)`);
  console.log(ENTRY);
}

main();
