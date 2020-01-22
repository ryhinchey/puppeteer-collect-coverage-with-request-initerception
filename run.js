const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on("request", request => {
    request.continue();
  });

  console.log("run startCoverage");
  await page.coverage.startJSCoverage();
  await page.coverage.startCSSCoverage();
  console.log("finished startCoverage");

  await page.setRequestInterception(true);

  await page.goto("https://google.com");
  console.log(await page.title());

  const coverage = [
    ...(await page.coverage.stopJSCoverage()),
    ...(await page.coverage.stopCSSCoverage())
  ];
  console.log("coverage", coverage);

  await browser.close();
})();
