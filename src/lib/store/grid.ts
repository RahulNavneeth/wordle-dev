import { writable } from 'svelte/store';

// Initializes a 2D array of 6 rows and 5 cells with empty string each => [["","","","",""] , .3. , ["","","","",""]]
export let GRID = writable<Array<string[]>>([...Array(6)].map(() => [...Array(5)].map(() => '')));
