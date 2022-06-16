<script lang="ts">
	import { GRID } from '$lib/store/grid';
	import { CURRENT_WORD } from '$lib/store/current_word';
	console.log($CURRENT_WORD);

	const onKeyUp = (index_row: number, index_cel: number, e: any) => {
		const key = e.keyCode || e.charCode;
		if (key === 8) {
			const cell = document.getElementById(`row${index_row}cell${index_cel - 1}`);
			cell?.focus();
			$GRID[index_row].row[index_cel].character = '';
		} else {
			const cell = document.getElementById(`row${index_row}cell${index_cel + 1}`);
			if ($GRID[index_row].row[index_cel].character.length === 1) {
				cell?.focus();
			}
		}
	};

	const submit = (index_row: number) => {
		if (index_row !== 5) {
			if ($GRID[index_row].row.map((element) => element.character).includes('')) {
				for (const i in $GRID[index_row].row) {
					if ($GRID[index_row].row[i].character === '') {
						$GRID[index_row].row[i].type = 'error';
					} else {
						$GRID[index_row].row[i].type = 'normal';
					}
				}
			} else {
				$GRID[index_row].isFocus = false;
				$GRID[index_row + 1].isFocus = true;
				const cell = document.getElementById(`row${index_row + 1}cell0`);
				cell?.focus();
			}
		} else {
			console.log($GRID);
		}
	};
</script>

<div class="flex flex-col items-center justify-center">
	{#each $GRID as row, index_row}
		<form on:submit|preventDefault={() => submit(index_row)}>
			<div id="row" class="flex flex-row items-center jusity-center">
				{#each row.row as cell, index_cell}
					<input
						disabled={!row.isFocus}
						bind:value={cell.character}
						on:keyup={(e) => onKeyUp(index_row, index_cell, e)}
						type="text"
						id="row{index_row}cell{index_cell}"
						maxlength="1"
						class="w-[60px] h-[60px] focus:scale-[110%] transition-all text-center border-2 text-[30px] {row.isFocus
							? cell.type === 'error'
								? 'border-red-700'
								: 'border-white '
							: 'border-gray-500'} bg-black outline-none font-primary capitalize font-black text-white rounded-md m-1"
					/>
					<button class="hidden" />
				{/each}
			</div>
		</form>
	{/each}
</div>
