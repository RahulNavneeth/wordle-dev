<script>
	import Nav from '$lib/components/nav.svelte';
	import { GRID } from '$lib/store/grid';
	import { USED_LETTERS } from '$lib/store/used_letters';
	import { WIN } from '$lib/store/win';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		const data = localStorage.getItem('grid');
		if (data) {
			$GRID = JSON.parse(data);
		}
		const used_letters = localStorage.getItem('used_letters');
		if (used_letters && data) {
			$USED_LETTERS = JSON.parse(used_letters);
		} else {
			localStorage.removeItem('used_letters');
		}
		const win = localStorage.getItem('win');
		if (win && data) {
			$WIN = JSON.parse(win);
		} else {
			localStorage.removeItem('win');
		}
	});
</script>

<div class="bg-black w-screen h-screen flex flex-col items-center ">
	<Nav />
	<div class="p-4 w-full h-full flex flex-col items-center justify-center">
		<slot />
	</div>
</div>
