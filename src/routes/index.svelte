<script lang="ts">
	import { GRID } from '$lib/store/grid';
	import { CURRENT_WORD } from '$lib/store/current_word';
	$: console.log($GRID);
	$: console.log($CURRENT_WORD);
</script>

<div class="flex flex-col items-center justify-center">
	{#each $GRID as row, index_row}
		<div class="flex flex-row items-center jusity-center">
			{#each row.row as _cell, index_cel}
				<input
					disabled={!row.completed}
					on:keydown={(e) => {
						return /[a-z]/i.test(e.key);
					}}
					bind:value={$GRID[index_row].row[index_cel]}
					type="text"
					maxlength="1"
					class="w-[60px] h-[60px] text-center border-2 text-[30px] {row.completed
						? 'border-white '
						: 'border-gray-500'} bg-black outline-none font-primary capitalize font-black text-white rounded-md m-1"
				/>
			{/each}
		</div>
	{/each}
</div>
