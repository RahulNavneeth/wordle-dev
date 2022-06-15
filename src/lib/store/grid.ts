import { writable } from 'svelte/store';
export let GRID = writable<Array<string[]>>([...Array(6)].map(() => [...Array(5)].map(() => '')));
