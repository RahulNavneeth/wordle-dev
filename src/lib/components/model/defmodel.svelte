<script lang="ts">
	import { WIN } from '$lib/constant';
	import { slide } from 'svelte/transition';
	import { model } from './model';
	export let data: { term: string; def: string; date: string };
</script>

<div
	aria-hidden="true"
	class="w-screen h-full fixed bg-black bg-opacity-60  backdrop-blur-[2px] flex flex-col items-center justify-center"
	on:click={() => {
		model.set(false);
	}}
>
	<div
		aria-hidden="true"
		transition:slide
		on:click|stopPropagation
		class="md:w-[500px] w-[90%] {$WIN.isWon === true
			? 'bg-lime-300'
			: 'bg-red-400'}  font-courier p-4 text-[20px] font-medium border-4  border-black"
	>
		{data.def}
	</div>
</div>
