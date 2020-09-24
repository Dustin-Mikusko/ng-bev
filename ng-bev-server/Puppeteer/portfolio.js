const { response } = require("express");
const puppeteer = require("puppeteer");

exports.methods = {
  generatePortfolioTable: async (funds) => {
    const stockTable = [];

    for (let i = 0; i < funds.length; i++) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      try {
        page.on("response", async (resp) => {
          const request = resp.request();
          if (request.url().includes("sal-service/v1/fund/process/stockStyle")) {
            const stringText = await resp.text();
            const text = JSON.parse(stringText);
            const stock = {
              [fund]: {
                    "Price/Earnings": {
                      "Fund": text.fund.prospectiveEarningsYield.toFixed(2),
                      "Cat. Average": text.categoryAverage.prospectiveEarningsYield.toFixed(2),
                      "Index": text.indexAverage.prospectiveEarningsYield.toFixed(2),
                    },
                    "Price/Book": {
                      "Fund": text.fund.prospectiveBookValueYield.toFixed(2),
                      "Cat. Average": text.categoryAverage.prospectiveBookValueYield.toFixed(2),
                      "Index": text.indexAverage.prospectiveBookValueYield.toFixed(2),
                    },
                    "Price/Sales": {
                      "Fund": text.fund.prospectiveRevenueYield.toFixed(2),
                      "Cat. Average": text.categoryAverage.prospectiveRevenueYield.toFixed(2),
                      "Index": text.indexAverage.prospectiveRevenueYield.toFixed(2),
                    },
                    "Price/Cash Flow": {
                      "Fund": text.fund.prospectiveCashFlowYield.toFixed(2),
                      "Cat. Average": text.categoryAverage.prospectiveCashFlowYield.toFixed(2),
                      "Index": text.indexAverage.prospectiveCashFlowYield.toFixed(2),
                    },
                    "Dividend Yield %'": {
                      "Fund": text.fund.prospectiveDividendYield.toFixed(2),
                      "Cat. Average": text.categoryAverage.prospectiveDividendYield.toFixed(2),
                      "Index": text.indexAverage.prospectiveDividendYield.toFixed(2),
                    },
                    "Long-Term Earnings %": {
                      "Fund": text.fund.forecasted5YearEarningsGrowth.toFixed(2),
                      "Cat. Average": text.categoryAverage.forecasted5YearEarningsGrowth.toFixed(2),
                      "Index": text.indexAverage.forecasted5YearEarningsGrowth.toFixed(2),
                    },
                    "Historical Earnings %": {
                      "Fund": text.fund.forecastedEarningsGrowth.toFixed(2),
                      "Cat. Average": text.categoryAverage.forecastedEarningsGrowth.toFixed(2),
                      "Index": text.indexAverage.forecastedEarningsGrowth.toFixed(2),
                    },
                    "Sales Growth %": {
                      "Fund": text.fund.forecastedRevenueGrowth.toFixed(2),
                      "Cat. Average": text.categoryAverage.forecastedRevenueGrowth.toFixed(2),
                      "Index": text.indexAverage.forecastedRevenueGrowth.toFixed(2),
                    },
                    "Cash-Flow Growth %": {
                      "Fund": text.fund.forecastedCashFlowGrowth.toFixed(2),
                      "Cat. Average": text.categoryAverage.forecastedCashFlowGrowth.toFixed(2),
                      "Index": text.indexAverage.forecastedCashFlowGrowth.toFixed(2),
                    },
                    "Book-Value Growth %": {
                      "Fund": text.fund.forecastedBookValueGrowth.toFixed(2),
                      "Cat. Average": text.categoryAverage.forecastedBookValueGrowth.toFixed(2),
                      "Index": text.indexAverage.forecastedBookValueGrowth.toFixed(2),
                    },
                  }
              };
              stockTable.push(stock);
          }
        });
        await page.goto(
          `https://www.morningstar.com/funds/xnas/${funds[i]}/portfolio`
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



// const stocks = [
//   "etilx",
//   "etihx",
//   "etimx",
//   "etidx",
//   "etibx",
//   "pksfx",
//   "pxsgx",
//   "viisx",
//   "ggezx",
//   "ambfx",
//   "amefx",
//   "gvtfx",
// ];

// testPortfolio = async (funds) => {
//   const stockTable = [];

//     for (let i = 0; i < funds.length; i++) {
//       const browser = await puppeteer.launch();
//       const page = await browser.newPage();
//       try {
//         page.on("response", async (resp) => {
//           const request = resp.request();
//           if (request.url().includes("sal-service/v1/fund/process/stockStyle")) {
//             const stringText = await resp.text();
//             const text = JSON.parse(stringText);
//             const stock = {
//               [funds[i]]: {
//                     "Price/Earnings": {
//                       Fund: text.fund.prospectiveEarningsYield.toFixed(2),
//                       "Cat. Average": text.categoryAverage.prospectiveEarningsYield.toFixed(2),
//                       Index: text.indexAverage.prospectiveEarningsYield.toFixed(2),
//                     },
//                     "Price/Book": {
//                       Fund: text.fund.prospectiveBookValueYield.toFixed(2),
//                       "Cat. Average": text.categoryAverage.prospectiveBookValueYield.toFixed(2),
//                       Index: text.indexAverage.prospectiveBookValueYield.toFixed(2),
//                     },
//                     "Price/Sales": {
//                       Fund: text.fund.prospectiveRevenueYield.toFixed(2),
//                       "Cat. Average": text.categoryAverage.prospectiveRevenueYield.toFixed(2),
//                       Index: text.indexAverage.prospectiveRevenueYield.toFixed(2),
//                     },
//                     "Price/Cash Flow": {
//                       Fund: text.fund.prospectiveCashFlowYield.toFixed(2),
//                       "Cat. Average": text.categoryAverage.prospectiveCashFlowYield.toFixed(2),
//                       Index: text.indexAverage.prospectiveCashFlowYield.toFixed(2),
//                     },
//                     "Dividend Yield %'": {
//                       Fund: text.fund.prospectiveDividendYield.toFixed(2),
//                       "Cat. Average": text.categoryAverage.prospectiveDividendYield.toFixed(2),
//                       Index: text.indexAverage.prospectiveDividendYield.toFixed(2),
//                     },
//                     "Long-Term Earnings %": {
//                       Fund: text.fund.forecasted5YearEarningsGrowth.toFixed(2),
//                       "Cat. Average": text.categoryAverage.forecasted5YearEarningsGrowth.toFixed(2),
//                       Index: text.indexAverage.forecasted5YearEarningsGrowth.toFixed(2),
//                     },
//                     "Historical Earnings %": {
//                       Fund: text.fund.forecastedEarningsGrowth.toFixed(2),
//                       "Cat. Average": text.categoryAverage.forecastedEarningsGrowth.toFixed(2),
//                       Index: text.indexAverage.forecastedEarningsGrowth.toFixed(2),
//                     },
//                     "Sales Growth %": {
//                       Fund: text.fund.forecastedRevenueGrowth.toFixed(2),
//                       "Cat. Average": text.categoryAverage.forecastedRevenueGrowth.toFixed(2),
//                       Index: text.indexAverage.forecastedRevenueGrowth.toFixed(2),
//                     },
//                     "Cash-Flow Growth %": {
//                       Fund: text.fund.forecastedCashFlowGrowth.toFixed(2),
//                       "Cat. Average": text.categoryAverage.forecastedCashFlowGrowth.toFixed(2),
//                       Index: text.indexAverage.forecastedCashFlowGrowth.toFixed(2),
//                     },
//                     "Book-Value Growth %": {
//                       Fund: text.fund.forecastedBookValueGrowth.toFixed(2),
//                       "Cat. Average": text.categoryAverage.forecastedBookValueGrowth.toFixed(2),
//                       Index: text.indexAverage.forecastedBookValueGrowth.toFixed(2),
//                     },
//                   }
//               };
//               stockTable.push(stock);
//           }
//         });
//         await page.goto(
//           `https://www.morningstar.com/funds/xnas/${funds[i]}/portfolio`
//         );
//         await page.waitForTimeout(2500);
//         await browser.close();
//       } catch {
//         console.log(`Error getting ${funds[i]}`);
//         await browser.close();
//       }
//     }
//     console.log(stockTable);
//     return stockTable;
// }

// testPortfolio(stocks);
