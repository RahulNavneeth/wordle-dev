import { writable } from 'svelte/store';

export const USED_LETTERS = writable<string[]>([]);
