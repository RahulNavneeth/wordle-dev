export const getLs = (item: string) => {
	const data = window.localStorage.getItem(item);
	return data != null ? JSON.parse(data) : null;
};
