const playwright = require('playwright');
const {captureEmail, captureUsername}  = require('./helpers');

(async () => {
  const browser = await playwright.chromium.connectOverCDP('ws://127.0.0.1:9222/devtools/browser/8fe2489e-4bdd-4029-b841-a57eeeff2c50');
  const defaultContext = browser.contexts()[0];
  const page = await defaultContext.newPage();
  await page.waitForLoadState();

  await page.goto('https://mail.google.com');
  const emails = await page.locator('table[role="grid"] tbody tr').all();
  console.log({emails})

  for (let email of emails) {
    const pagePromise = defaultContext.waitForEvent('page');
    await email.click({ modifiers: ['Meta'] })
    const newPage = await pagePromise;
    await page.waitForLoadState();
    const h2_title = await newPage.locator('h2').first().allInnerTexts()
    const sender = await newPage.locator('span[role=gridcell]').first()

    const show = await newPage.locator("div[data-tooltip='Show details']").click()
    const details = await page.locator('table tbody tr')
    const showText = await details.allInnerTexts()

    // await page.getByLabel('Show details').click();
    // const from = await page.getByText('from:').allInnerTexts();
    // const cell = await page.getByRole('cell', { name: 'to:' }).allInnerTexts();
    const dd = await sender.allInnerTexts()
    const title = await newPage.title()
    const url = await newPage.url()
    console.log({dd})
    const capturedEmail = captureEmail(dd[0])
    const capturedName = captureUsername(dd[0])
    // await newPage.screenshot({ path: `${title.replaceAll(' ', '-')}.png`});
    console.log({h2_title, capturedEmail, capturedName});
    await newPage.close()
  }

  await defaultContext.close();
  await browser.close();
})()

// "/Users/godwinogbara/Projects/Kubernetes/kube-demo/chrome/mac_arm-121.0.6167.85/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing" --remote-debugging-port=9222

// await page.getByLabel('Show details').click();
// await page.getByText('from:').click();
// await page.getByRole('cell', { name: 'to:' }).click();
// await page.getByText('date:').click();
// await page.getByText('from:').click();
// await page.getByRole('cell', { name: 'subject:' }).click();
// await page.getByText('subject:').click();
// await page.getByRole('cell', { name: 'mailed-by:' }).click();

// querySelectorAll("tr[colspan='2']");
// window.document.querySelectorAll("td[colspan='2']");
