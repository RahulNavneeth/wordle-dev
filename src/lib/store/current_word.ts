import { writable } from 'svelte/store';
import axios from 'axios';
import { API_HOST } from '../constant';

type word = { word: string; info: string };
export const CURRENT_WORD = writable<word>({ word: '', info: '' });

const getWord = async () => {
	const { data } = await axios.get(`${API_HOST}/api/word`);
	CURRENT_WORD.update((x) => {
		x = data.word;
		return x;
	});
};

getWord();
