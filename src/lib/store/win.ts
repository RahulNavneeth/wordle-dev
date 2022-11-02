import { writable } from 'svelte/store';

type win = { isWon: boolean | 'PLAYING'; streak: number };
export const WIN = writable<win>({ isWon: 'PLAYING', streak: 0 });
