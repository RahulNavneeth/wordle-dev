export const get = () => {
	const words = ['CONST', 'FLOOR', 'ASYNC', 'AWAIT'];
	return {
		body: {
			word: words[Math.floor(Math.random() * words.length)]
		}
	};
};
