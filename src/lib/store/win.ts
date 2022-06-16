import { writable } from 'svelte/store';

type win = { isWon: Boolean; streak: number };
export let WIN = writable<win>({ isWon: false, streak: 0 });
