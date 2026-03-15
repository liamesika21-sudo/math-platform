import puppeteer from 'puppeteer';

const pages = [
  { url: 'http://localhost:3099/infi-summary', output: '/Users/liamesika/Desktop/infi/infi-summary.pdf' },
  { url: 'http://localhost:3099/print-theorems', output: '/Users/liamesika/Desktop/infi/infi-theorems.pdf' },
  { url: 'http://localhost:3099/print-weeks-1-3', output: '/Users/liamesika/Desktop/infi/infi-weeks-1-3.pdf' },
  { url: 'http://localhost:3099/print-weeks-10-12', output: '/Users/liamesika/Desktop/infi/infi-weeks-10-12.pdf' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  for (const { url, output } of pages) {
    console.log(`Generating ${output}...`);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Hide the no-print elements (print button etc.)
    await page.addStyleTag({ content: '.no-print { display: none !important; }' });

    await page.pdf({
      path: output,
      format: 'A4',
      margin: { top: '1.5cm', bottom: '1.5cm', left: '1.5cm', right: '1.5cm' },
      printBackground: true,
    });

    console.log(`  ✓ Saved: ${output}`);
    await page.close();
  }

  await browser.close();
  console.log('Done!');
})();
