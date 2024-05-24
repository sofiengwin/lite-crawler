const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.connectOverCDP('ws://127.0.0.1:9222/devtools/browser/bb0d178a-3689-4bbc-91eb-6a985960d7b0');
  const defaultContext = browser.contexts()[0];
  const page = await defaultContext.newPage();
  await page.goto('https://www.sportingnews.com/');
  await page.waitForLoadState();
  const orderSent = page.locator('.news-list');
  const el = await orderSent.waitFor();
  const newsItems = await orderSent.getByRole('listitem').all();

  console.log({orderSent, newsItems}, el)
 for(let item of newsItems) {
  const pagePromise = defaultContext.waitForEvent('page');
  await item.click({ modifiers: ['Meta'] })
  const newPage = await pagePromise;
  const title = await newPage.title()
  const url = await newPage.url()
  await page.screenshot({ path: `${title}.png`, fullPage: true });
  console.log({title, url});

  await newPage.close()
 }

  await defaultContext.close();
  await browser.close();
})()
