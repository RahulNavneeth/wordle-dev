import { writable } from 'svelte/store';

const PRODUCTION = false;
export const API_HOST = PRODUCTION ? 'https://wordle-dev.vercel.app' : 'http://localhost:5173';

type win = { isWon: boolean | 'PLAYING'; streak: number };
export const WIN = writable<win>({ isWon: 'PLAYING', streak: 0 });

export const USED_LETTERS = writable<string[]>([]);
