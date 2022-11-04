<script>
	import Nav from '$lib/components/nav.svelte';
	import { parseDate } from '$lib/function/parseDate';
	// import { GRID } from '$lib/store/grid';
	import { API_HOST, USED_LETTERS } from '$lib/constant';
	import { WIN } from '$lib/constant';
	import { onMount } from 'svelte';
	import '../app.css';
	import { CURRENT_WORD } from '$lib/store/current';
	import axios from 'axios';
	import { GRID } from '$lib/store/grid';

	onMount(async () => {
		const { data } = await axios.get(`${API_HOST}/api/word`);
		CURRENT_WORD.set(data);
		GRID.set({
			date: parseDate(new Date()),
			grid: [...Array(6)].map((_element, index) => {
				return {
					isFocus: index === 0 ? true : false,
					row: [...Array(data.term.length)].map(() => {
						return { type: 'normal', character: '' };
					})
				};
			})
		});
	});

	let dots = '';
	setInterval(() => {
		if (dots.length != 3) {
			dots += '.';
		} else {
			dots = '';
		}
	}, 500);
</script>

<svelte:head>
	<title>Wordle - DEV</title>
</svelte:head>

<div class="bg-black w-screen h-screen flex flex-col items-center ">
	<!-- <Nav /> -->
	<div class="w-full h-full flex flex-col items-center justify-center">
		{#if $CURRENT_WORD != null && $GRID != null}
			<slot />
		{:else}
			<span class="font-courier text-[30px] text-black px-2  font-black underline bg-lime-300"
				>Loading{dots}</span
			>
		{/if}
	</div>
</div>
