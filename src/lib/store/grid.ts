import { writable } from 'svelte/store';

type grid = {
	isFocus: boolean;
	row: { type: 'normal' | 'error' | 'placed' | 'misplaced'; character: string }[];
};

export const GRID = writable<{ date: string; grid: grid[] }>();
