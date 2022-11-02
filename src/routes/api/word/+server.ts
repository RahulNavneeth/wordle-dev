import { TERMS } from '$lib/store/terms';
import puppeteer from 'puppeteer';
export const GET = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	let terms: string[] = [];

	TERMS.subscribe((value) => (terms = value));

	const term = terms[Math.floor(Math.random() * terms.length)];

	await page.goto(`https://www.google.com/search?q=${term}`);

	const data = await page.evaluate(async () => {
		return await document.querySelectorAll(
			'#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div > div > div:nth-child(1) > div > div > div > span:nth-child(2)'
		)[0]?.innerHTML;
	});

	await browser.close();
	return new Response(JSON.stringify({ term: term, def: data.split('.')[0] + '.' }));
};
