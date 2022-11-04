export const parseDate = (date: Date) => {
	return `${
		String(date.getMonth()).length === 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
	}/${
		String(date.getDate()).length === 1 ? `0${date.getDate()}` : date.getDate()
	}/${date.getFullYear()}`;
};
