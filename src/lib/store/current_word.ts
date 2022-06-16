import { writable } from 'svelte/store';
import axios from 'axios';
import { API_HOST } from '../constant';

const getWord = () => {
	let DATA = '';
	axios.get(`${API_HOST}/api/word`).then((response) => {
		DATA = response.data.word;
	});
	return DATA;
};
export const CURRENT_WORD = writable<string>(getWord());
