import { writable } from 'svelte/store';

type grid = { completed: boolean; row: string[] };

export let GRID = writable<grid[]>(
	[...Array(6)].map((_element, index) => {
		return { completed: index === 0 ? true : false, row: [...Array(5)].map(() => '') };
	})
);
