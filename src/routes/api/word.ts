export const get = () => {
	const words = ['CONST', 'FUNCTION', 'ASYNC', 'AWAIT']; // some standin words before initializing DB(prisma)
	return {
		body: {
			word: words[Math.floor(Math.random() * words.length)] // sends random word from the words array
		}
	};
};
