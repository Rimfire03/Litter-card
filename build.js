const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Read image-data.js and litter-card.js and bundle them into a standalone ES module
const imageDataContent = fs.readFileSync(path.join(srcDir, 'image-data.js'), 'utf8');
const litterCardContent = fs.readFileSync(path.join(srcDir, 'litter-card.js'), 'utf8');

// Replace the import with the inline constant
const bundledContent = litterCardContent.replace(
  "import { DEFAULT_IMAGE } from './image-data.js';",
  imageDataContent
);

fs.writeFileSync(path.join(distDir, 'litter-card.js'), bundledContent, 'utf8');
console.log('Successfully built dist/litter-card.js');
