const puppeteer = require('puppeteer');

const stocks = [
  'etilx',
  'etihx',
  'etimx',
  'etidx',
  'etibx',
  'pksfx',
  'pxsgx',
  'viisx',
  'ggezx',
  'ambfx',
  'amefx',
  'gvtfx',
]

const generateRiskTable = async (funds) => {
  const stockTable = [];

  for (let i = 0; i < funds.length; i++) {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto(
        `https://www.morningstar.com/funds/xnas/${funds[i]}/risk`
      );

      await page.waitFor(4000);

      if (
        (await page.$(
          "#__layout > div > div:nth-child(6) > div > div > header > div > div.mds-masthead__right > button"
        )) !== null
      ) {
        await page.click(
          "#__layout > div > div:nth-child(6) > div > div > header > div > div.mds-masthead__right > button"
        );
        console.log("clicked");
      }

      if (
        (await page.$(
          "#__layout > div > div:nth-child(6) > div > div > div.mdc-overlay__button-container > button"
        )) !== null
      ) {
        await page.click(
          "#__layout > div > div:nth-child(6) > div > div > div.mdc-overlay__button-container > button"
        );
        console.log("clicked");
      }

      await page.waitForSelector(
        "#__layout > div > div.mdc-page-shell__content.mds-page-shell__content > main > div.fund__content > div > div > div.mdc-column.mds-layout-grid__col.fund__content-sal.mds-layout-grid__col--12.mds-layout-grid__col--auto-at-1092 > sal-components > section > div > div > div > sal-components-mip-risk > div > div:nth-child(2) > div > div.sal-component-body > div:nth-child(1) > div:nth-child(2) > div > sal-components-mip-risk-volatility-measures > div > div:nth-child(3) > div > div.sal-risk-volatility-measures__dataTable"
      );

      const table = await page.$$eval(
        "#__layout > div > div.mdc-page-shell__content.mds-page-shell__content > main > div.fund__content > div > div > div.mdc-column.mds-layout-grid__col.fund__content-sal.mds-layout-grid__col--12.mds-layout-grid__col--auto-at-1092 > sal-components > section > div > div > div > sal-components-mip-risk > div > div:nth-child(2) > div > div.sal-component-body > div:nth-child(1) > div:nth-child(2) > div > sal-components-mip-risk-volatility-measures > div > div:nth-child(3) > div > div.sal-risk-volatility-measures__dataTable > table > tbody > tr",
        (rows) => rows.map((row) => row.innerText)
      );

      const spaced = table.map((row) => row.split("\t"));

      const stock = {
        [funds[i]]: {
          "Alpha": {
            Fund: spaced[0][1],
            Category: spaced[0][2],
            Index: spaced[0][3],
          },
          "Beta": {
            Fund: spaced[1][1],
            Category: spaced[1][2],
            Index: spaced[1][3],
          },
          "RSquared": {
            Fund: spaced[2][1],
            Category: spaced[2][2],
            Index: spaced[2][3],
          },
          "Sharpe Ratio": {
            Fund: spaced[3][1],
            Category: spaced[3][2],
            Index: spaced[3][3],
          },
          "Standard Deviation": {
            Fund: spaced[4][1],
            Category: spaced[4][2],
            Index: spaced[4][3],
          },
        },
      };

      await browser.close();
      console.log(stock);
      stockTable.push(stock);
    } catch {
      console.log(`Error getting ${funds[i]}`);
    }
  }

  console.log(stockTable);
};

generateRiskTable(stocks);

// const stuff = stocks.map(stock => generateRiskTable(stock));

// Promise.all(stuff).then(values => console.log(values));

const tables = [];


