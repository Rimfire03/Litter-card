const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = path.join(__dirname, 'src');
const modelsDir = path.join(srcDir, 'models');
const imagesDir = path.join(srcDir, 'images');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Ensure src/images exists and has doel_ti_pro_25.png
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
const defaultImgPath = path.join(__dirname, 'litiere.png');
const modelImgPath = path.join(imagesDir, 'doel_ti_pro_25.png');
if (fs.existsSync(defaultImgPath) && !fs.existsSync(modelImgPath)) {
  fs.copyFileSync(defaultImgPath, modelImgPath);
}

// 1. Encode all images in src/images to Base64 in src/image-data.js
const imageFiles = fs.readdirSync(imagesDir).filter(f => /\.(png|jpe?g|webp|svg)$/i.test(f));
const imagesMap = {};

imageFiles.forEach(file => {
  const filePath = path.join(imagesDir, file);
  const ext = path.extname(file).replace('.', '').toLowerCase();
  const mime = ext === 'svg' ? 'image/svg+xml' : ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
  const b64 = fs.readFileSync(filePath).toString('base64');
  imagesMap[file] = `data:${mime};base64,${b64}`;
  // Also copy image to dist for external reference
  fs.copyFileSync(filePath, path.join(distDir, file));
});

// Fallback if image-data needs DEFAULT_IMAGE
const defaultImgKey = imagesMap['doel_ti_pro_25.png'] ? 'doel_ti_pro_25.png' : imageFiles[0];
const imageDataJsContent = `// Auto-generated image bundle
export const MODEL_IMAGES = ${JSON.stringify(imagesMap, null, 2)};
export const DEFAULT_IMAGE = MODEL_IMAGES['${defaultImgKey}'] || '';
`;
fs.writeFileSync(path.join(srcDir, 'image-data.js'), imageDataJsContent, 'utf8');

// 2. Compute dynamic version x.yy based on git commit count and branch
function getVersion() {
  try {
    const countStr = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
    let branch = '';
    try {
      branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    } catch (e) {}

    const count = parseInt(countStr, 10);
    const nextCommitNum = count + 1;
    const x = Math.floor(nextCommitNum / 100);
    const yy = String(nextCommitNum % 100).padStart(2, '0');
    
    // Add -dev suffix if on dev branch
    if (branch === 'dev') {
      return `${x}.${yy}-dev`;
    }
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

// 3. Bundle models directly into JS
const modelFiles = fs.readdirSync(modelsDir).filter(f => f.endsWith('.js') && f !== 'index.js');
const modelDefs = {};

modelFiles.forEach(file => {
  const key = file.replace('.js', '');
  const content = fs.readFileSync(path.join(modelsDir, file), 'utf8');
  // Simple evaluation/extraction of export default object
  // Replace export default with variable assignment to eval safely
  const cleanContent = content.replace(/export\s+default\s+/, 'return ');
  try {
    const obj = new Function(cleanContent)();
    modelDefs[key] = obj;
  } catch (err) {
    console.error(`Failed to parse model file ${file}:`, err);
  }
});

const modelsJsBundle = `
export const LITTER_MODELS = ${JSON.stringify(modelDefs, null, 2)};
export const DEFAULT_MODEL_ID = "doel_ti_pro_25";
export function getModelConfig(modelId) {
  return LITTER_MODELS[modelId] || LITTER_MODELS[DEFAULT_MODEL_ID] || LITTER_MODELS.generic;
}
`;

// 4. Read and bundle litter-card.js
let litterCardContent = fs.readFileSync(path.join(srcDir, 'litter-card.js'), 'utf8');

// Inject dynamic version into source content
litterCardContent = litterCardContent.replace(
  /const CARD_VERSION = "[^"]+";/,
  `const CARD_VERSION = "${currentVersion}";`
);

// Save updated src/litter-card.js
fs.writeFileSync(path.join(srcDir, 'litter-card.js'), litterCardContent, 'utf8');

// Replace imports with inlined bundles for standalone file
let bundledContent = litterCardContent
  .replace("import { DEFAULT_IMAGE } from './image-data.js';", imageDataJsContent)
  .replace("import { DEFAULT_IMAGE, MODEL_IMAGES } from './image-data.js';", imageDataJsContent)
  .replace("import { LITTER_MODELS, DEFAULT_MODEL_ID, getModelConfig } from './models/index.js';", modelsJsBundle);

fs.writeFileSync(path.join(distDir, 'litter-card.js'), bundledContent, 'utf8');
console.log(`Successfully built dist/litter-card.js (v${currentVersion})`);
