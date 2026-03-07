const { execSync } = require('child_process');
const rcedit = require('rcedit');
const path = require('path');

const exeName = 'my-pc-overview-win-x64.exe';
const exePath = path.join(__dirname, 'dist-exe', exeName);
const iconPath = path.join(__dirname, 'icon.ico');

async function buildAll() {
  execSync('npm run build-exe', { stdio: 'inherit' });

  await rcedit(exePath, {
    icon: iconPath,
    'version-string': {
      ProductName: 'My PC Overview',
      FileDescription: 'A local real-time hardware reader',
      CompanyName: 'Miguel Dev',
      LegalCopyright: 'Copyright © 2026',
      OriginalFilename: exeName
    }
  });
}

buildAll();