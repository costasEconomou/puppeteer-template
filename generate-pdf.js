import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setContent('file:///mnt/c/Office/PortableApps/Documents/Office/ValenTec/open-source/node-docs/index.html', {waitUntil: 'networkidle2'});
    await page.pdf({path: 'output.pdf', format: 'A4'});
    await browser.close();
})();
