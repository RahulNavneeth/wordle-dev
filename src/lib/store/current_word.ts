import { writable } from 'svelte/store';
import axios from 'axios';
import { API_HOST } from '../constant';

type word = { word: string; info: string };
export const CURRENT_WORD = writable<word>({ word: '', info: '' });

const getWord = async () => {
	const response = await fetch(`${API_HOST}/api/word`);
	const data = await response.json();
	CURRENT_WORD.update((x) => {
		x = data.word;
		return x;
	});
};

getWord();
