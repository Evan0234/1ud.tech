import puppeteer from 'puppeteer';

async function visitPage(targetUrl, pageNumber) {
  console.log(`Bot #${pageNumber} is starting...`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`Bot #${pageNumber} is visiting ${targetUrl}...`);
  const response = await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });

  if (response && response.ok()) {
    console.log(`Bot #${pageNumber}: Website is working. Status code: ${response.status()}`);
  } else {
    console.error(`Bot #${pageNumber}: Website is not working. Status code: ${response.status()}`);
    await browser.close();
    return;
  }

  await page.setViewport({ width: 1080, height: 1024 });

  try {
    console.log(`Bot #${pageNumber} is waiting for the page to fully load...`);
    await new Promise(r => setTimeout(r, 5000));

    const pageText = await page.evaluate(() => {
      return document.body.innerText;
    });

    console.log(`Bot #${pageNumber}: Visible page text:\n${pageText}`);

  } catch (error) {
    console.error(`Bot #${pageNumber}: Error while processing the page.`, error);
    await browser.close();
    return;
  }

  console.log(`Bot #${pageNumber} has completed its tasks and is now leaving the site...`);
  await browser.close();
  console.log(`Bot #${pageNumber} has left the site.`);
}

async function main() {
  const targetUrl = process.argv[2] || 'https://zeeps.me/';
  const numBots = 1;

  const botPromises = Array.from({ length: numBots }, (_, i) => visitPage(targetUrl, i + 1));

  await Promise.all(botPromises);

  console.log('All bots have completed their tasks.');
}

main().catch(error => {
  console.error('An unexpected error occurred:', error);
});
