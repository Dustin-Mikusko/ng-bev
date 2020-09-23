const puppeteer = require('puppeteer');

export const generatePortfolioTable = async (fund) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.morningstar.com/funds/xnas/${fund}/portfolio`);
  const yes = await page.$('#__layout > div > div.mdc-page-shell__content.mds-page-shell__content > main > div.fund__content > div > div > div.mdc-column.mds-layout-grid__col.fund__content-sal.mds-layout-grid__col--12.mds-layout-grid__col--auto-at-1000 > sal-components > section > div > div > div > div > div:nth-child(2) > div.sal-small-12.sal-columns > div.sal-row.ng-scope > div:nth-child(2) > div > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div.sal-component-body.ng-scope > div > div > table > tbody')
  console.log(yes);
  if (yes) {
    console.log('yes')
  } else {
    console.log('hello')
  }

  // await page.waitForSelector('#__layout > div > div.mdc-page-shell__content.mds-page-shell__content > main > div.fund__content > div > div > div.mdc-column.mds-layout-grid__col.fund__content-sal.mds-layout-grid__col--12.mds-layout-grid__col--auto-at-1000 > sal-components > section > div > div > div > div > div:nth-child(2) > div.sal-small-12.sal-columns > div.sal-row.ng-scope > div:nth-child(2) > div > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div.sal-component-body.ng-scope > div > div > table > tbody');

  const table = await page.$$eval('#__layout > div > div.mdc-page-shell__content.mds-page-shell__content > main > div.fund__content > div > div > div.mdc-column.mds-layout-grid__col.fund__content-sal.mds-layout-grid__col--12.mds-layout-grid__col--auto-at-1000 > sal-components > section > div > div > div > div > div:nth-child(2) > div.sal-small-12.sal-columns > div.sal-row.ng-scope > div:nth-child(2) > div > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div.sal-component-body.ng-scope > div > div > table > tbody > tr', rows => rows.map(row => row.innerText));

  const spaced = table.map(row => row.split('\t'))

  const stock = {
    [fund]: {
      "Price/Earnings": {
        "Fund": spaced[0][1],
        "Cat. Average": spaced[0][2],
        "Index": spaced[0][3]
      },
      "Price/Book": {
        "Fund": spaced[1][1],
        "Cat. Average": spaced[1][2],
        "Index": spaced[1][3]
      },
      "Price/Sales": {
        "Fund": spaced[2][1],
        "Cat. Average": spaced[2][2],
        "Index": spaced[2][3]
      },
      "Price/Cash Flow": {
        "Fund": spaced[3][1],
        "Cat. Average": spaced[3][2],
        "Index": spaced[3][3]
      },
      "Dividend Yield %'": {
        "Fund": spaced[4][1],
        "Cat. Average": spaced[4][2],
        "Index": spaced[4][3]
      },
      "Long-Term Earnings %": {
        "Fund": spaced[5][1],
        "Cat. Average": spaced[5][2],
        "Index": spaced[5][3]
      },
      "Historical Earnings %": {
        "Fund": spaced[6][1],
        "Cat. Average": spaced[6][2],
        "Index": spaced[6][3]
      },
      "Sales Growth %": {
        "Fund": spaced[7][1],
        "Cat. Average": spaced[7][2],
        "Index": spaced[7][3]
      },
      "Cash-Flow Growth %": {
        "Fund": spaced[8][1],
        "Cat. Average": spaced[8][2],
        "Index": spaced[8][3]
      },
      "Book-Value Growth %": {
        "Fund": spaced[9][1],
        "Cat. Average": spaced[9][2],
        "Index": spaced[9][3]
      },
    }
  };
  await browser.close();

  console.log(stock)
}
