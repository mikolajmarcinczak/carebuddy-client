<template>
	<button @click="openModal" class="p-2 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
    focus:ring-4 focus:outline-none focus:ring-green-200 text-white font-medium
    rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Dodaj alarm o lekach</button>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
	name: 'AddAlarmButton',
	setup() {
		const modalOpen = ref(false);

		const openModal = () => {
			modalOpen.value = true;
		};

		return {
			openModal,
			modalOpen
		};
	}
};
</script>