const puppeteer = require('puppeteer');
(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
        page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
        page.on('requestfailed', request => {
            console.log('REQUEST_FAILED:', request.url(), request.failure().errorText);
        });
        page.on('response', response => {
            if (!response.ok()) {
                console.log('RESPONSE_NOT_OK:', response.url(), response.status());
            }
        });

        await page.goto('http://localhost:8000', { waitUntil: 'networkidle0' });
        await browser.close();
    } catch (e) {
        console.error("SCRIPT ERROR:", e);
    }
})();
