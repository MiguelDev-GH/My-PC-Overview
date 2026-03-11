import { execSync } from 'child_process'
import rcedit from 'rcedit';
import path from 'path';
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exeName = 'pc-overview.exe';
const exePath = path.join(__dirname, 'dist-exe', exeName);
const iconPath = path.join(__dirname, 'icon.ico');

async function buildAll() {
  execSync('npm run build-exe', { stdio: 'inherit' });

  await rcedit(exePath, {
    icon: iconPath,
    'version-string': {
      ProductName: exeName,
      FileDescription: 'A local real-time hardware reader',
      CompanyName: 'Miguel Dev',
      LegalCopyright: 'Copyright © 2026',
      OriginalFilename: exeName
    }
  });
}

buildAll();