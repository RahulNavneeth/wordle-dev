import { writable } from 'svelte/store';

type word = { term: string; def: string; date: string } | null;
export const CURRENT_WORD = writable<word>(null);
export const CURRENT_GUESS = writable<string[] | null>();
