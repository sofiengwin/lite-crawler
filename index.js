const playwright = require('playwright');
const {captureEmail, captureUsername}  = require('./helpers');

(async () => {
  const browser = await playwright.chromium.connectOverCDP('ws://127.0.0.1:9222/devtools/browser/8fe2489e-4bdd-4029-b841-a57eeeff2c50');
  const defaultContext = browser.contexts()[0];
  const page = await defaultContext.newPage();
  await page.waitForLoadState();

  await page.goto('https://mail.google.com');
  const emails = await page.locator('table[role="grid"] tbody tr').all();
  const capturedEmails = []

  for (let email of emails) {
    const pagePromise = defaultContext.waitForEvent('page');
    await email.click({ modifiers: ['Meta'] })
    const newPage = await pagePromise;
    await page.waitForLoadState();
    const title = await newPage.locator('h2').first().allInnerTexts()
    const sender = await newPage.locator('span[role=gridcell]').first()
    const senderDetails = await sender.allInnerTexts()
    console.log({senderDetails, title}, title[0])
    const senderEmail = captureEmail(senderDetails[0])
    const senderName = captureUsername(senderDetails[0])
    await newPage.screenshot({ path: `${title.replaceAll(' ', '-')}.png`});
    capturedEmails.push({title, senderEmail, senderName});
    await newPage.close()
  }

  console.log({capturedEmails})
  await defaultContext.close();
  await browser.close();
})()

