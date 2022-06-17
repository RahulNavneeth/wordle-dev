import { writable } from 'svelte/store';

type win = { isWon: Boolean | 'PLAYING'; streak: number };
export let WIN = writable<win>({ isWon: 'PLAYING', streak: 0 });
