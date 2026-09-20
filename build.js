const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Compute dynamic version x.yy based on git commit count
function getVersion() {
  try {
    const countStr = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
    // Next commit count index (current count + 1 for the commit being built, or current count)
    const count = parseInt(countStr, 10);
    // Next commit will be count + 1
    const nextCommitNum = count + 1;
    const x = Math.floor(nextCommitNum / 100);
    const yy = String(nextCommitNum % 100).padStart(2, '0');
    return `${x}.${yy}`;
  } catch (err) {
    return '0.01';
  }
}

const currentVersion = getVersion();
console.log(`Building Litter Card version: v${currentVersion}`);

// Update package.json version
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    pkg.version = currentVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  } catch (e) {
    console.error('Error updating package.json:', e);
  }
}

// Read image-data.js and litter-card.js and bundle them into a standalone ES module
const imageDataContent = fs.readFileSync(path.join(srcDir, 'image-data.js'), 'utf8');
let litterCardContent = fs.readFileSync(path.join(srcDir, 'litter-card.js'), 'utf8');

// Inject dynamic version into source content
litterCardContent = litterCardContent.replace(
  /const CARD_VERSION = "[^"]+";/,
  `const CARD_VERSION = "${currentVersion}";`
);

// Save updated src/litter-card.js with the calculated version as well
fs.writeFileSync(path.join(srcDir, 'litter-card.js'), litterCardContent, 'utf8');

// Replace the import with the inline constant
const bundledContent = litterCardContent.replace(
  "import { DEFAULT_IMAGE } from './image-data.js';",
  imageDataContent
);

fs.writeFileSync(path.join(distDir, 'litter-card.js'), bundledContent, 'utf8');
console.log(`Successfully built dist/litter-card.js (v${currentVersion})`);
