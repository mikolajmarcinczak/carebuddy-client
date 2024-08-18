<template>
<div
		class="flex flex-col items-center justify-center px-0 py-0 mx-auto md:mt-36 lg:py-0
		shadow-[0_3px_10px_rgb(0,0,0,0.2)]">

	<div class="flex items-center justify-center">
			<div class="bg-white n-1/3  rounded-lg h-32 w-48">
					<div class="flex items-center justify-center flex-col">
							<h1 class="text-gray-800 dark:text-black font-bold mb-3 mt-10"> Tytuł notatki </h1>
							<h1 class="text-gray-800 dark:text-blacktext-m"> Fragment notatki </h1>
					</div>

			</div>
	</div>

</div>
</template>

<script lang="ts">
export default {
	data() {
		return {
			userData: {
				username: "Jan Kowalski",
				about_me: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est ac purus pharetra auctor sit amet nec ex."
			}
		};
	}
};
</script>
