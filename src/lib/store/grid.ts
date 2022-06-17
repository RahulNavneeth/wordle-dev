import { parseDate } from '$lib/parseDate';
import { writable } from 'svelte/store';

type grid = {
	isFocus: boolean;
	row: { type: 'normal' | 'error' | 'placed' | 'misplaced'; character: string }[];
};

export let GRID = writable<{ date: string; grid: grid[] }>({
	date: parseDate(new Date()),
	grid: [...Array(6)].map((_element, index) => {
		return {
			isFocus: index === 0 ? true : false,
			row: [...Array(5)].map(() => {
				return { type: 'normal', character: '' };
			})
		};
	})
});
