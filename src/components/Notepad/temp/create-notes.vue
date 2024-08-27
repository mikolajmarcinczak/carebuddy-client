<template>
	<div class="container mx-auto p-4">
		<button @click="openModal" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
			<i class="fas fa-plus"></i>
		</button>
		<div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
			<div class="bg-white p-8 rounded-lg overflow-y-auto max-h-[80vh]">
				<div>
					<h2 class="text-lg font-bold mb-4">Dodaj notatkę</h2>
					<form @submit.prevent="sendDataModel" class="space-y-4 max-w-md mx-auto mt-4 p-4 border rounded shadow-md">
						<div>
							<label for="title" class="block text-gray-700">Tytuł</label>
							<input type="text" id="title" v-model="titleText" class="w-full px-3 py-2 border rounded" required />
						</div>
						<div>
							<label for="content" class="block text-gray-700">Treść notatki</label>
							<textarea id="content" v-model="contentText" class="w-full px-3 py-2 border rounded" required></textarea>
						</div>
						<button type="submit" class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Zapisz</button>
					</form>
					<div class="flex justify-end mt-6">
						<button @click="closeModal" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
							Anuluj
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {Note} from "@/types/note.model";
import {ref} from "vue";
import {useNoteStore} from "@/stores/note.module";

export default {
	name: "create-notes",
	setup() {
		const titleText = ref("");
		const contentText = ref("");
		const modalOpen = ref(false);
		const noteStore = useNoteStore();

		const openModal = () => {
			modalOpen.value = true;
		};

		const closeModal = () => {
			modalOpen.value = false;
		};

		const sendDataModel = async () => {
			if (titleText.value.length > 0 && contentText.value.length > 0) {
				const newNote = new Note({
					id: '',
					user_id: '', // Set the appropriate user_id
					related_user_ids: [],
					related_urls: [],
					title: titleText.value,
					content: contentText.value,
				});

				await noteStore.createNote(newNote);

				titleText.value = "";
				contentText.value = "";
				closeModal();
			}
		};

		return {
			titleText,
			contentText,
			modalOpen,
			openModal,
			closeModal,
			sendDataModel
		};
	}
}
</script>

<style scoped>

</style>