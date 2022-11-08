import { writable } from 'svelte/store';

type grid = {
	isFocus: boolean;
	row: { type: 'normal' | 'error' | 'placed' | 'misplaced' | 'failed' }[];
};

export const GRID = writable<{ date: string; grid: grid[] }>();
