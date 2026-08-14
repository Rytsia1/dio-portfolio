#!/usr/bin/env node
/**
 * Cross-platform replacement for _verify.bat.
 *
 * Runs the same sanity checks the old Windows batch file performed:
 *   1. Leftover-artifact check  (was: if exist ...)
 *   2. globals.css grid classes (was: findstr /C:".bg-grid" "app\globals.css" ...)
 *   3. Project detail page hover classes (was: findstr /C:"hover:bg-surface-..." ...)
 *
 * Content checks are hard failures (exit code 1) so CI pipelines catch
 * regressions. Leftover-artifact checks are warnings only, since those
 * files are removed manually. Pure Node.js — no findstr, no cmd.exe,
 * no hardcoded absolute paths, so it runs identically on Windows,
 * macOS, and Linux.
 */

import { readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

let failures = 0;

const pass = (msg) => console.log(`  [PASS] ${msg}`);
const warn = (msg) => console.log(`  [WARN] ${msg}`);
const fail = (msg) => {
  console.error(`  [FAIL] ${msg}`);
  failures += 1;
};

/**
 * True only when a real regular file exists at relPath.
 * statSync().isFile() is used instead of existsSync() so the Windows
 * NUL device (which always "exists" on Windows) is not reported as a file.
 */
function isRealFile(relPath) {
  try {
    return statSync(join(root, relPath)).isFile();
  } catch {
    return false;
  }
}

/** Returns the file contents, or null when the file cannot be read. */
function readProjectFile(relPath) {
  try {
    return readFileSync(join(root, relPath), 'utf8');
  } catch {
    return null;
  }
}

/**
 * Asserts that `needle` is present in (or absent from) a project file.
 * Cross-platform equivalent of the batch file's findstr checks.
 */
function expectContent(relPath, needle, { shouldExist = true, description }) {
  const contents = readProjectFile(relPath);
  if (contents === null) {
    fail(`${description} — could not read ${relPath}`);
    return;
  }
  const found = contents.includes(needle);
  if (found === shouldExist) {
    pass(description);
  } else {
    fail(
      `${description} — "${needle}" is ${shouldExist ? 'MISSING from' : 'still present in'} ${relPath}`,
    );
  }
}

// 1. Leftover Windows artifacts — warnings only (was: if exist ... echo ...)
console.log('=== Leftover artifact check ===');
for (const name of ['_verify.bat', 'install-deps.bat', 'install-deps.log', 'nul']) {
  if (isRealFile(name)) {
    warn(`${name} STILL EXISTS (safe to delete)`);
  } else {
    pass(`${name} removed`);
  }
}

// 2. globals.css grid classes (was: findstr /C:".bg-grid" "app\globals.css" ...)
console.log('\n=== globals.css grid check ===');
expectContent(join('app', 'globals.css'), '.bg-grid', {
  description: '.bg-grid class: FOUND',
});
expectContent(join('app', 'globals.css'), '.bg-pixel-grid', {
  description: '.bg-pixel-grid class: FOUND',
});

// 3. Project detail page hover classes (was: findstr /C:"hover:bg-surface-..." ...)
console.log('\n=== project detail page hover check ===');
const detailPage = join('app', 'projects', '[slug]', 'page.tsx');
expectContent(detailPage, 'hover:bg-surface-soft', {
  description: 'uses bg-surface-soft: YES',
});
expectContent(detailPage, 'hover:bg-surface-hover', {
  shouldExist: false,
  description: 'still uses bg-surface-hover: NO',
});

// Summary + exit code so CI/CD pipelines fail on regressions
console.log('');
if (failures > 0) {
  console.error(`check: ${failures} check(s) FAILED`);
  process.exit(1);
}
console.log('check: all checks passed');