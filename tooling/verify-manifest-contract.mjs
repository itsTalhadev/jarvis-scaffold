/**
 * Validates manifest.json contract (package.json locked, not editable).
 * Run: node tooling/verify-manifest-contract.mjs
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const raw = readFileSync(join(root, 'manifest.json'), 'utf8');
const manifest = JSON.parse(raw);

let failed = false;
if (manifest.editable?.includes('package.json')) {
  console.error('FAIL: package.json must not be in manifest "editable"');
  failed = true;
}
if (!manifest.locked?.includes('package.json')) {
  console.error('FAIL: package.json must be in manifest "locked"');
  failed = true;
}
if (failed) process.exit(1);
console.log('OK: manifest contract (package.json locked)');
