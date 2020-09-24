const puppeteer = require('puppeteer');

exports.methods = {
  generateRiskTable: async (funds) => {
    const stockTable = [];

  for (let i = 0; i < funds.length; i++) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    try {
      page.on("response", async(resp) => {
        const request = resp.request();
        if (request.url().includes("sal-service/v1/fund/performance/riskVolatility")) {
          const stringText = await resp.text();
          const text = JSON.parse(stringText);
          const stock = {
            [funds[i]]: {
              "Alpha": {
                "Fund": text.fundRiskVolatility.for3Year.alpha === null ? null : text.fundRiskVolatility.for3Year.alpha.toFixed(2),
                "Category": text.categoryRiskVolatility.for3Year.alpha === null ? null : text.categoryRiskVolatility.for3Year.alpha.toFixed(2),
                "Index": text.indexRiskVolatility.for3Year.alpha === null ? null : text.indexRiskVolatility.for3Year.alpha.toFixed(2),
              },
              "Beta": {
                "Fund": text.fundRiskVolatility.for3Year.beta === null ? null : text.fundRiskVolatility.for3Year.beta.toFixed(2),
                "Category": text.categoryRiskVolatility.for3Year.beta === null ? null : text.categoryRiskVolatility.for3Year.beta.toFixed(2),
                "Index": text.indexRiskVolatility.for3Year.beta === null ? null : text.indexRiskVolatility.for3Year.beta.toFixed(2),
              },
              "RSquared": {
                "Fund": text.fundRiskVolatility.for3Year.rSquared === null ? null : text.fundRiskVolatility.for3Year.rSquared.toFixed(2),
                "Category": text.categoryRiskVolatility.for3Year.rSquared === null ? null : text.categoryRiskVolatility.for3Year.rSquared.toFixed(2),
                "Index": text.indexRiskVolatility.for3Year.rSquared === null ? null : text.indexRiskVolatility.for3Year.rSquared.toFixed(2),
              },
              "Sharpe Ratio": {
                "Fund": text.fundRiskVolatility.for3Year.sharpeRatio === null ? null : text.fundRiskVolatility.for3Year.sharpeRatio.toFixed(2),
                "Category": text.categoryRiskVolatility.for3Year.sharpeRatio === null ? null : text.categoryRiskVolatility.for3Year.sharpeRatio.toFixed(2),
                "Index": text.indexRiskVolatility.for3Year.sharpeRatio === null ? null : text.indexRiskVolatility.for3Year.sharpeRatio.toFixed(2),
              },
              "Standard Deviation": {
                "Fund": text.fundRiskVolatility.for3Year.standardDeviation === null ? null : text.fundRiskVolatility.for3Year.standardDeviation.toFixed(2),
                "Category": text.categoryRiskVolatility.for3Year.standardDeviation === null ? null : text.categoryRiskVolatility.for3Year.standardDeviation.toFixed(2),
                "Index": text.indexRiskVolatility.for3Year.standardDeviation === null ? null : text.indexRiskVolatility.for3Year.standardDeviation.toFixed(2),
              },
            },
          };
          stockTable.push(stock);
        }
      });
      await page.goto(
        `https://www.morningstar.com/funds/xnas/${funds[i]}/risk`
      );
      await page.waitForTimeout(2500);
      await browser.close();
    } catch {
      console.log(`Error getting ${funds[i]}`);
      await browser.close();
    }
  }
  return stockTable;
  },
};

// testRisk = async funds => {
//   const stockTable = [];

//   for (let i = 0; i < funds.length; i++) {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();
//     try {
//       page.on("response", async(resp) => {
//         const request = resp.request();
//         if (request.url().includes("sal-service/v1/fund/performance/riskVolatility")) {
//           const stringText = await resp.text();
//           const text = JSON.parse(stringText);
//           const stock = {
//             [funds[i]]: {
//               "Alpha": {
//                 Fund: text.fundRiskVolatility.for3Year.alpha === null ? null : text.fundRiskVolatility.for3Year.alpha.toFixed(2),
//                 Category: text.categoryRiskVolatility.for3Year.alpha === null ? null : text.categoryRiskVolatility.for3Year.alpha.toFixed(2),
//                 Index: text.indexRiskVolatility.for3Year.alpha === null ? null : text.indexRiskVolatility.for3Year.alpha.toFixed(2),
//               },
//               "Beta": {
//                 Fund: text.fundRiskVolatility.for3Year.beta === null ? null : text.fundRiskVolatility.for3Year.beta.toFixed(2),
//                 Category: text.categoryRiskVolatility.for3Year.beta === null ? null : text.categoryRiskVolatility.for3Year.beta.toFixed(2),
//                 Index: text.indexRiskVolatility.for3Year.beta === null ? null : text.indexRiskVolatility.for3Year.beta.toFixed(2),
//               },
//               "RSquared": {
//                 Fund: text.fundRiskVolatility.for3Year.rSquared === null ? null : text.fundRiskVolatility.for3Year.rSquared.toFixed(2),
//                 Category: text.categoryRiskVolatility.for3Year.rSquared === null ? null : text.categoryRiskVolatility.for3Year.rSquared.toFixed(2),
//                 Index: text.indexRiskVolatility.for3Year.rSquared === null ? null : text.indexRiskVolatility.for3Year.rSquared.toFixed(2),
//               },
//               "Sharpe Ratio": {
//                 Fund: text.fundRiskVolatility.for3Year.sharpeRatio === null ? null : text.fundRiskVolatility.for3Year.sharpeRatio.toFixed(2),
//                 Category: text.categoryRiskVolatility.for3Year.sharpeRatio === null ? null : text.categoryRiskVolatility.for3Year.sharpeRatio.toFixed(2),
//                 Index: text.indexRiskVolatility.for3Year.sharpeRatio === null ? null : text.indexRiskVolatility.for3Year.sharpeRatio.toFixed(2),
//               },
//               "Standard Deviation": {
//                 Fund: text.fundRiskVolatility.for3Year.standardDeviation === null ? null : text.fundRiskVolatility.for3Year.standardDeviation.toFixed(2),
//                 Category: text.categoryRiskVolatility.for3Year.standardDeviation === null ? null : text.categoryRiskVolatility.for3Year.standardDeviation.toFixed(2),
//                 Index: text.indexRiskVolatility.for3Year.standardDeviation === null ? null : text.indexRiskVolatility.for3Year.standardDeviation.toFixed(2),
//               },
//             },
//           };
//           console.log(stock);
//           stockTable.push(stock);
//         }
//       });
//       await page.goto(
//         `https://www.morningstar.com/funds/xnas/${funds[i]}/risk`
//       );
//       await page.waitForTimeout(2500);
//       await browser.close();
//     } catch {
//       console.log(`128 Error getting ${funds[i]}`);
//       await browser.close();
//     }
//   }
//   console.log(stockTable);
//   console.log(stockTable.length);
//   return stockTable;
// };

// testRisk(stocks);
