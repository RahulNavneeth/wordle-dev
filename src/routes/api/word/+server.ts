import { TERMS } from '$lib/store/terms';
import axios from 'axios';
import puppeteer from 'puppeteer';
export const GET = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	let terms: string[] = [];

	TERMS.subscribe((value) => (terms = value));

	const term = terms[Math.floor(Math.random() * terms.length)];

	await page.goto(`https://www.hackterms.com/${term}`);
	const selector = 'definition-body';

	await axios.get(`https://www.hackterms.com/${term}`);
	const data = await page.evaluate(async (selector) => {
		//@ts-ignore
		return await document.getElementsByClassName(selector)[0]?.innerText;
	}, selector);

	await browser.close();

	return new Response(
		JSON.stringify({ term: term, def: data, date: new Date().toLocaleDateString() })
	);
};
