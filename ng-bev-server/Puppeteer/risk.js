const puppeteer = require('puppeteer');

const generateRiskTable = async (fund) => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(`https://www.morningstar.com/funds/xnas/${fund}/risk`);

  await page.waitForSelector('#__layout > div > div.mdc-page-shell__content.mds-page-shell__content > main > div.fund__content > div > div > div.mdc-column.mds-layout-grid__col.fund__content-sal.mds-layout-grid__col--12.mds-layout-grid__col--auto-at-1092 > sal-components > section > div > div > div > sal-components-mip-risk > div > div:nth-child(2) > div > div.sal-component-body > div:nth-child(1) > div:nth-child(2) > div > sal-components-mip-risk-volatility-measures > div > div:nth-child(3) > div > div.sal-risk-volatility-measures__dataTable > table > tbody > tr:nth-child(5) > td:nth-child(1) > span');

  const table = await page.$$eval('#__layout > div > div.mdc-page-shell__content.mds-page-shell__content > main > div.fund__content > div > div > div.mdc-column.mds-layout-grid__col.fund__content-sal.mds-layout-grid__col--12.mds-layout-grid__col--auto-at-1000 > sal-components > section > div > div > div > div > div:nth-child(2) > div > div.sal-component-body.ng-scope > div:nth-child(1) > div:nth-child(2) > div > div > div.sal-row.ng-scope > div > div.sal-risk-volatility-measures__dataTable > table > tbody > tr', rows => rows.map(row => row.innerText));

  const spaced = table.map(row => row.split('\t'))

  const stock = {
    [fund]: {
      "Alpha": {
        "Fund": spaced[1][1],
        "Category": spaced[1][2],
        "Index": spaced[1][3]
      },
      "Beta": {
        "Fund": spaced[2][1],
        "Category": spaced[2][2],
        "Index": spaced[2][3]
      },
      "R\n2\n": {
        "Fund": spaced[3][1],
        "Category": spaced[3][2],
        "Index": spaced[3][3]
      },
      "Sharpe Ratio": {
        "Fund": spaced[4][1],
        "Category": spaced[4][2],
        "Index": spaced[4][3]
      },
      "Standard Deviation": {
        "Fund": spaced[5][1],
        "Category": spaced[5][2],
        "Index": spaced[5][3]
      },
    }
  };

  await browser.close();

  console.log(stock);
}

generateRiskTable('etimx');
