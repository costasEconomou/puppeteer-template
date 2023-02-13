import fs from 'fs';
import puppeteer from 'puppeteer';
import { fileServe } from './src/js/server.js'

// Prepare output paths
const outPath = 'out';
if (fs.existsSync(outPath)) {
  await fs.promises.rm(outPath, { recursive: true });
}
await fs.promises.mkdir(outPath);

async function run() {
  fileServe('template.html', './src/', 8000);

  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],});
  const page = await browser.newPage();

  await page.goto('http://localhost:8000/', { networkIdleTimeout: 5000, waitUntil: 'networkidle2', timeout: 3000000 });
  //await page.waitFor(2000);
  const html = await page.content();
  fs.writeFileSync("./out/index.html", html);

  //await page.pdf({path: './out/index.html', format: 'A4'});

  await browser.close()

  process.exit()
}

run();

