const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');

// Гарантированное создание .nojekyll
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, '.nojekyll'), '');