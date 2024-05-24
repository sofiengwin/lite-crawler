const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const chrome_page = await context.newPage();
  const page = new ChromePageWrapper(chrome_page)
  await page.goto('https://example.com/');
  await page.getByText('title', 'This domain is for use in')
  console.log('result:', page.result)
  await chrome_page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();


 class ChromePageWrapper {
  constructor(page) {
    this.page = page
    this.result = {};
  }

  async goto(link) {
    await this.page.goto(link);
  }

  async getByText(name, text) {
    const result = await this.page.getByText(text)
    this.result[name] = await result.innerText()
  }
 }