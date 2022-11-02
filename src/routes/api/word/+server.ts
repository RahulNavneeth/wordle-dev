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
			date: '06/19/2022',
			info: 'Inside an async function you can use the await keyword before a call to a function that returns a promise.'
		},
		{
			word: 'BREAK',
			date: '06/20/2022',
			info: 'Loop control statement which is used to terminate the loop.'
		},
		{
			word: 'FLOOR',
			date: '06/21/2022',
			info: 'A variable type that is used to store floating-point number values.'
		},
		{
			word: 'WHILE',
			date: '06/22/2022',
			info: 'A simple programming language constructed from assignments, sequential composition, conditionals and while statements.'
		},
		{
			word: 'CLASS',
			date: '06/23/2022',
			info: 'An extensible program-code-template for creating objects, providing initial values for state and implementations of behavior.'
		}
	];
	const word = words[Math.floor(Math.random() * words.length)];
	if (word) {
		const { date, ...data } = word;
		return {
			body: {
				word: data
			}
		};
	}
};
