import { writable } from 'svelte/store';

export let USED_LETTERS = writable<string[]>([]);
