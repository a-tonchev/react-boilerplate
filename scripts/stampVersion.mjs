import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = process.argv[2] || '.env.production';
const envPath = path.resolve(__dirname, '..', envFile);

const stamp = `v${Date.now()}`;

const original = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

let next;
if (original.match(/^VITE_VERSION_UNIQUE_STRING=.*/m)) {
  next = original.replace(/^VITE_VERSION_UNIQUE_STRING=.*$/m, `VITE_VERSION_UNIQUE_STRING=${stamp}`);
} else {
  next = (original.endsWith('\n') || original === '' ? original : `${original}\n`)
    + `VITE_VERSION_UNIQUE_STRING=${stamp}\n`;
}

fs.writeFileSync(envPath, next);
console.info(`Stamped VITE_VERSION_UNIQUE_STRING=${stamp} in ${envFile}`);
