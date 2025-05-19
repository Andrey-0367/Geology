const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const outDir = join(__dirname, 'out');
if (!existsSync(outDir)) mkdirSync(outDir);
writeFileSync(join(outDir, '.nojekyll'), '');