import { parseDate } from '$lib/parseDate';

export const get = () => {
	type word = { word: string; date: string; info: string };

	// standin data before initializing DB(prisma)
	const words: word[] = [
		{
			word: 'CONST',
			date: '06/16/2022',
			info: 'A keyword that defines a variable or pointer as unchangeable.'
		},
		{
			word: 'FLOOR',
			date: '06/17/2022',
			info: 'Function returns the largest integer less than or equal to a given number.'
		},
		{
			word: 'ASYNC',
			date: '06/18/2022',
			info: 'Ensures that the function returns a promise, and wraps non-promises in it.'
		},
		{
			word: 'AWAIT',
			date: '06/16/2022',
			info: 'Inside an async function you can use the await keyword before a call to a function that returns a promise.'
		}
	];
	const word = words.find((element) => element.date === parseDate(new Date()));
	if (word) {
		const { date, ...data } = word;
		return {
			body: {
				word: data
			}
		};
	}
};
