const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.connectOverCDP('ws://127.0.0.1:9222/devtools/browser/bb0d178a-3689-4bbc-91eb-6a985960d7b0');
  const defaultContext = browser.contexts()[0];
  const page = await defaultContext.newPage();
  await page.waitForLoadState();

  await page.goto('https://mail.google.com');
  const table = await page.locator('table[role="grid"]');
  console.log({table})
  // // Click on the first email
  // await page.click('table[role="grid"] tbody tr:first-child');
  // await page.screenshot({ path: 'first_email.png' });

})()

// "/Users/godwinogbara/Projects/Kubernetes/kube-demo/chrome/mac_arm-121.0.6167.85/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing" --remote-debugging-port=9222

// https://example.com/