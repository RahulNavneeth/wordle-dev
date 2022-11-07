<script lang="ts">
	import { GRID } from '$lib/store/grid';
	import { CURRENT_GUESS, CURRENT_WORD } from '$lib/store/current';
	import { WIN } from '$lib/constant';
	import { USED_LETTERS } from '$lib/constant';
	import { parseDate } from '$lib/function/parseDate';
	import { TERMS } from '$lib/store/terms';
	import { getLs } from '$lib/function/getLSvalue';

	const LEN_WORD = $CURRENT_WORD?.term.length as number;
	const CURRENT_LIST = $TERMS.filter((i) => i.length === LEN_WORD);
	console.log(CURRENT_LIST);
	window.localStorage.setItem('CURRENT_GUESS', JSON.stringify([...Array(6)].map((i) => '')));

	CURRENT_GUESS.set(getLs('CURRENT_GUESS'));

	setInterval(() => {
		document.getElementById('INPUT_WORD')?.focus();
	}, 1000);

	let value = '';
	let count = 0;

	const submit = () => {
		if (value.length != LEN_WORD) {
			$GRID.grid[count].row.map((i) => (i.type = 'normal'));
			for (let i = 0; i < LEN_WORD - value.length; i++) {
				$GRID.grid[count].row[LEN_WORD - i - 1].type = 'error';
			}
		} else {
			$GRID.grid[count].row.map((i) => {
				i.type = 'normal';
				return i;
			});
			if (CURRENT_LIST.includes(value)) {
				$GRID.grid[count].isFocus = false;
				if (value === $CURRENT_WORD?.term) {
					$GRID.grid[count].row.map((i) => {
						i.type = 'placed';
						return i;
					});
					$WIN.isWon = true;
				} else {
					count++;
					if (count === 6) {
						$WIN.isWon = false;
					} else {
						for (let i = 0; i < LEN_WORD; i++) {
							if (value[i] === $CURRENT_WORD?.term[i]) {
								$GRID.grid[count - 1].row[i].type = 'placed';
							} else if ($CURRENT_WORD?.term.includes(value[i])) {
								$GRID.grid[count - 1].row[i].type = 'misplaced';
							}
						}
						$GRID.grid[count].isFocus = true;
						value = '';
					}
				}
			} else {
				for (let i = 0; i < LEN_WORD; i++) {
					document.getElementById(`row${count}`)?.classList.add('animate-shake');
					setTimeout(() => {
						document.getElementById(`row${count}`)?.classList.remove('animate-shake');
					}, 1000);
				}
				// setTimeout(() => {
				// 	$GRID.grid[count].row.map((i) => {
				// 		i.type = 'error';
				// 		return i;
				// 	});
				// });
			}
		}
	};

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Backspace') {
			value = value.slice(0, value.length - 1);
			$CURRENT_GUESS != null ? ($CURRENT_GUESS[count] = value) : '';
		} else if (e.key === 'Enter') {
			submit();
		} else {
			if (
				(e.keyCode >= 48 && e.keyCode <= 57) ||
				(e.keyCode >= 65 && e.keyCode <= 90 && value.length < LEN_WORD)
			) {
				value += e.key.toLowerCase();
				$CURRENT_GUESS != null ? ($CURRENT_GUESS[count] = value) : '';
			}
		}
	});
</script>

<div class="flex flex-col w-full items-center justify-evenly h-full">
	{#if $GRID.date === parseDate(new Date())}
		{#if $WIN.isWon === true}
			<div class="font-primary h-[60px] font-extrabold text-[60px] text-lime-300">
				YOU WON <span class="text-[30px]">#{$WIN.streak}</span>
			</div>
		{:else if $WIN.isWon === 'PLAYING'}
			<div class="flex flex-row h-[60px] items-center w-screen flex-wrap justify-center">
				{#each $USED_LETTERS as i, k}
					<div class="flex-none">
						<div
							class="font-primary m-1 flex flex-col items-center justify-center rounded-lg font-extrabold md:text-[30px] text-[20px] w-[30px] h-[30px] md:w-[50px] md:h-[50px] {$CURRENT_WORD?.term
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
		{:else}
			<div class="font-primary h-[60px] font-extrabold text-[60px] text-red-400">YOU LOST</div>
		{/if}
	{/if}
	<div class="w-full flex flex-col items-center">
		{#each $GRID.grid as row, index_row}
			<div id="row-{index_row}" class="flex flex-row items-center jusity-center">
				{#each row.row as cell, index_cell}
					<div
						id="row{index_row}cell{index_cell}"
						class="w-[60px] h-[60px] focus:scale-[110%] transition-all text-center border-2 text-[30px] {row.isFocus
							? cell.type === 'error'
								? 'border-red-700 bg-black text-white'
								: 'border-white bg-black text-white'
							: cell.type === 'placed'
							? 'border-lime-700 bg-lime-300 text-black shadow-inner'
							: cell.type === 'misplaced'
							? 'border-yellow-700 bg-yellow-300 text-black'
							: 'border-gray-500 bg-black text-white'} outline-none flex flex-col items-center justify-center font-primary capitalize font-black rounded-md m-1"
					>
						{$CURRENT_GUESS != null
							? $CURRENT_GUESS[index_row][index_cell] === undefined
								? ''
								: $CURRENT_GUESS[index_row][index_cell]
							: 'undefined'}
					</div>
				{/each}
				<button class="hidden" />
			</div>
		{/each}
	</div>
	<div class="h-[60px] md:w-1/2 w-full">
		{#if $WIN.isWon != 'PLAYING'}
			<div class="text-white">
				<div class="text-[40px] font-courier font-extrabold capitalize tracking-tight">
					{$CURRENT_WORD?.term} = () =>
				</div>
				<div
					class="font-courier text-black font-bold {$WIN.isWon
						? 'bg-lime-300'
						: 'bg-red-400'}  px-4 text-[25px]"
				>
					{$CURRENT_WORD?.def}
				</div>
			</div>
		{/if}
	</div>
</div>
