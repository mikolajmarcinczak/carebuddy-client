<template>
	<div class="container mx-auto p-4">
		<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded" @click="showModal">
			<i class="fas fa-plus"></i>
		</button>
		<div class="container mt-4" v-show="showElement">
			<div class="bg-white p-6 rounded-lg shadow-lg">
				<div class="space-y-4">
					<div>
						<label for="title" class="block text-gray-700">Tytuł</label>
						<input type="text" id="title" v-model="titleText" class="w-full px-3 py-2 border rounded"/>
					</div>
					<div>
						<label for="content" class="block text-gray-700">Treść notatki</label>
						<textarea id="content" v-model="contentText" class="w-full px-3 py-2 border rounded"></textarea>
					</div>
					<div class="flex space-x-4">
						<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded" @click="sendDataModel">Zapisz</button>
						<button class="bg-gray-500 text-white font-bold py-2 px-4 rounded" @click="closeModal">Anuluj</button>
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
		const showElement = ref(false);
		const noteStore = useNoteStore();

		const showModal = () => {
			showElement.value = !showElement.value;
		};

		const closeModal = () => {
			showElement.value = false;
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
				showElement.value = false;
			}
		};

		return {
			titleText,
			contentText,
			showElement,
			showModal,
			closeModal,
			sendDataModel
		};
	}
}
</script>

<style scoped>

</style>