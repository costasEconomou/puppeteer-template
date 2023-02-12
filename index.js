import fs from 'fs';
import puppeteer from 'puppeteer';
import { fileServe } from './src/js/server.js'


async function run() {
  fileServe('template.html', './src/', 8000);

  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],});
  const page = await browser.newPage();

  //page.on('request', (data) => console.log(data));
  //page.on('requestFailed', (data) => console.log(data));
  //page.on('requestFinished', (data) => console.log(data));
  await page.goto('http://localhost:8000/', { networkIdleTimeout: 5000, waitUntil: 'networkidle0', timeout: 3000000 });
  //await page.goto('file:///mnt/c/Office/PortableApps/Documents/Office/ValenTec/open-source/node-docs/src/template.html', { networkIdleTimeout: 5000, waitUntil: 'networkidle2', timeout: 3000000 });
  console.log('waiting...');
  //await page.waitFor(2000);
  const html = await page.content();
  fs.writeFileSync("./out/index.html", html);
  console.log(page.content());

  //await page.setContent('file:///mnt/c/Office/PortableApps/Documents/Office/ValenTec/open-source/node-docs/out/index.html', { waitUntil: 'networkidle2' });
  //await page.setContent(html, { waitUntil: 'networkidle2' });
  const pdf = await page.pdf();
  fs.writeFileSync("./out/index.pdf", pdf);

  await browser.close()

  //process.exit()
}

run();

