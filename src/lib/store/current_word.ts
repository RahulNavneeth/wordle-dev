import { writable } from 'svelte/store';
import axios from 'axios';
import { API_HOST, API_WORD } from '../constant';

// gets random word for CURRENT_WORD from '/api/words'
const getWord = async () => {
	const { data } = await axios.get(API_HOST + API_WORD);
	return data.word;
};

export const CURRENT_WORD = writable<string>(await getWord());
