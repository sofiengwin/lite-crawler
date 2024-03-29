const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.connectOverCDP('ws://127.0.0.1:9222/devtools/browser/bb0d178a-3689-4bbc-91eb-6a985960d7b0');
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
    const dd = await sender.allInnerTexts()
    const title = await newPage.title()
    const url = await newPage.url()
    // await newPage.screenshot({ path: `${title.replaceAll(' ', '-')}.png`});
    console.log({title, url, h2_title, dd});
    await newPage.close()
  }

  await defaultContext.close();
  await browser.close();
})()

// "/Users/godwinogbara/Projects/Kubernetes/kube-demo/chrome/mac_arm-121.0.6167.85/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing" --remote-debugging-port=9222

// https://example.com/