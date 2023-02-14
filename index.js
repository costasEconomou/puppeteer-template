import fs from 'fs';
import puppeteer from 'puppeteer';
import { fileServe } from './src/js/server.js'

// Specify options
const fileName = 'template.html';
const portNum = 8000;
const outPath = 'out/';

// Prepare output paths
if (fs.existsSync(outPath)) {
  await fs.promises.rm(outPath, { recursive: true });
}
await fs.promises.mkdir(outPath);

(async () => {
  // Start server
  fileServe(`${fileName}`, './src/', `${portNum}`);

  // Launch headless browser
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],});
  const page = await browser.newPage();

  // Go to static file
  await page.goto(`http://localhost:${portNum}/`, { waitUntil: 'networkidle0' });

  // Do your process here...
  const html = await page.content();
  fs.writeFileSync(`${outPath}index.html`, html);

  // Exit process
  await browser.close()
  process.exit()
})();
