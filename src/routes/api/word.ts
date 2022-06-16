import { parseDate } from '$lib/parseDate';

export const get = () => {
	type word = { word: string; date: string };

	// standin data before initializing DB(prisma)
	const words: word[] = [
		{ word: 'CONST', date: '06/16/2022' },
		{ word: 'FLOOR', date: '06/17/2022' },
		{ word: 'ASYNC', date: '06/18/2022' },
		{ word: 'AWAIT', date: '06/16/2022' }
	];
	return {
		body: {
			word: words.find((element) => element.date === parseDate(new Date()))?.word
		}
	};
};
