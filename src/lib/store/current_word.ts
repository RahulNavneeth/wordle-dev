import { writable } from 'svelte/store';
import axios from 'axios';
import { API_HOST } from '../constant';

// gets random word for CURRENT_WORD from '/api/word'
const getWord = async () => {
	const { data } = await axios.get(`${API_HOST}/api/word`);
	return data.word;
};

export const CURRENT_WORD = writable<string>(await getWord());
