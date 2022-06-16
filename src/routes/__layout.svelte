<script>
	import Nav from '$lib/components/nav.svelte';
	import '../app.css';
</script>

<div class="bg-black w-screen h-screen flex flex-col items-center ">
	<!-- <Nav /> -->
	<div class="p-4 w-full h-full flex flex-col items-center justify-center">
		<slot />
	</div>
</div>
