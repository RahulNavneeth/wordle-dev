<script>
	import Nav from '$lib/components/nav.svelte';
	import { parseDate } from '$lib/parseDate';
	import { GRID } from '$lib/store/grid';
	import { USED_LETTERS } from '$lib/store/used_letters';
	import { WIN } from '$lib/store/win';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		const data = localStorage.getItem('grid');
		if (data) {
			const grid = JSON.parse(data);

			if (grid.date !== parseDate(new Date())) {
				localStorage.removeItem('grid');
				let winData = localStorage.getItem('win');
				if (winData) {
					let win = JSON.parse(winData);
					win.isWon = false;
					localStorage.setItem('win', JSON.stringify(win));
				}
				localStorage.removeItem('used_letters');
			} else {
				$GRID = grid;
			}
		}

		const used_letters = localStorage.getItem('used_letters');
		if (used_letters) {
			$USED_LETTERS = JSON.parse(used_letters);
		}
		const win = localStorage.getItem('win');
		if (win) {
			$WIN = JSON.parse(win);
		}
	});
</script>

<div class="bg-black w-screen h-screen flex flex-col items-center ">
	<!-- <Nav /> -->
	<div class="p-4 w-full h-full flex flex-col items-center justify-center">
		<slot />
	</div>
</div>
