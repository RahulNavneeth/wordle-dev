<script lang="ts">
	import { GRID } from '$lib/store/grid';
	import { CURRENT_WORD } from '$lib/store/current_word';
	import { WIN } from '$lib/store/win';
	import { USED_LETTERS } from '$lib/store/used_letters';
	import { parseDate } from '$lib/parseDate';

	const onKeyUp = (index_row: number, index_cel: number, e: any) => {
		const key = e.keyCode || e.charCode;
		const CELL = $GRID.grid[index_row].row[index_cel];
		if (key === 8) {
			if (CELL.character === '') {
				const cell = document.getElementById(`row${index_row}cell${index_cel - 1}`);
				cell?.focus();
			} else {
				CELL.character = '';
			}
		} else {
			CELL.character = e.target.value;
			const cell = document.getElementById(`row${index_row}cell${index_cel + 1}`);
			if (CELL.character.length === 1) {
				if (index_cel !== 5) {
					cell?.focus();
				}
			}
		}
		localStorage.setItem('grid', JSON.stringify($GRID));
	};

	const submit = (index_row: number) => {
		const ROW = $GRID.grid[index_row].row;
		if (ROW.map((element) => element.character).includes('')) {
			for (const i in ROW) {
				if (ROW[i].character === '') {
					ROW[i].type = 'error';
				} else {
					ROW[i].type = 'normal';
				}
			}
		} else {
			document.getElementById(`row${index_row + 1}cell0`)?.focus();
			$GRID.grid[index_row].isFocus = false;
			ROW.map((element) => element.character).map((element, i) => {
				const current_word = $CURRENT_WORD.split('');
				if (current_word.includes(ROW[i].character.toUpperCase())) {
					if (current_word[i] === element.toUpperCase()) {
						ROW[i].type = 'placed';
					} else {
						ROW[i].type = 'misplaced';
					}
				}
				if (!$USED_LETTERS.includes(element)) {
					$USED_LETTERS = [...$USED_LETTERS, element];
				}
			});
			if (index_row !== 5) {
				$GRID.grid[index_row + 1].isFocus = true;
			}
			if (
				$CURRENT_WORD ===
				ROW.map((element) => element.character)
					.join('')
					.toUpperCase()
			) {
				$WIN.isWon = true;
				$WIN.streak++;
				localStorage.setItem('win', JSON.stringify($WIN));
				if (index_row !== 5) {
					$GRID.grid[index_row + 1].isFocus = false;
				}
			}
		}

		localStorage.setItem('grid', JSON.stringify($GRID));
		localStorage.setItem('used_letters', JSON.stringify($USED_LETTERS));
	};
</script>

<div class="flex flex-col items-center justify-evenly h-full">
	{#if $GRID.date === parseDate(new Date())}
		{#if $WIN.isWon}
			<div class="font-primary h-[60px] font-extrabold text-[60px] text-lime-300">YOU WON</div>
		{:else}
			<div class="flex flex-row h-[60px] items-center w-screen flex-wrap justify-center">
				{#each $USED_LETTERS as i, k}
					<div class="flex-none">
						<div
							class="font-primary m-1 flex flex-col items-center justify-center rounded-lg font-extrabold md:text-[30px] text-[20px] w-[30px] h-[30px] md:w-[50px] md:h-[50px] {$CURRENT_WORD
								.split('')
								.includes(i.toUpperCase())
								? 'bg-yellow-300'
								: 'bg-red-500'} text-black"
						>
							{i.toUpperCase()}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
	<div class="w-full flex flex-col items-center">
		{#each $GRID.grid as row, index_row}
			<form on:submit|preventDefault={() => submit(index_row)}>
				<div id="row" class="flex flex-row items-center jusity-center">
					{#each row.row as cell, index_cell}
						<input
							disabled={!row.isFocus}
							on:keyup={(e) => onKeyUp(index_row, index_cell, e)}
							type="text"
							value={cell.character.toUpperCase()}
							id="row{index_row}cell{index_cell}"
							maxlength="1"
							class="w-[60px] h-[60px] focus:scale-[110%] transition-all text-center border-2 text-[30px] {row.isFocus
								? cell.type === 'error'
									? 'border-red-700'
									: 'border-white bg-black text-white'
								: cell.type === 'placed'
								? 'border-lime-700 bg-lime-300 text-black shadow-inner'
								: cell.type === 'misplaced'
								? 'border-yellow-700 bg-yellow-300 text-black'
								: 'border-gray-500 bg-black text-white'} outline-none font-primary capitalize font-black rounded-md m-1"
						/>
					{/each}
					<button class="hidden" />
				</div>
			</form>
		{/each}
	</div>
	<div class="h-[60px]" />
</div>
