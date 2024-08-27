<template>
	<div class="container mx-auto p-4">
		<div class="bg-white p-6 rounded-lg shadow-lg">
			<div class="text-lg font-bold">
				{{ note.title }}
			</div>
			<div class="italic text-gray-600">
				{{ note.content }}
			</div>
			<div class="text-gray-500">
				{{ note.user_id }}
			</div>
			<div class="text-gray-500">
				{{ note.updated_at }}
			</div>
			<div class="flex justify-between mt-4">
        <span class="cursor-pointer text-blue-500" @click="showEdit">
          <i class="fas fa-edit"></i>
        </span>
				<span class="cursor-pointer text-red-500" @click="deleteNote(notesList)">
          <i class="fas fa-trash"></i>
        </span>
			</div>
		</div>
		<div class="bg-white p-6 rounded-lg shadow-lg mt-4" v-show="showModelEdit">
			<div class="space-y-4">
				<div>
					<label for="title" class="block text-gray-700">Tytuł</label>
					<input type="text" id="title" v-model="noteTitle" class="w-full px-3 py-2 border rounded"/>
				</div>
				<div>
					<label for="content" class="block text-gray-700">Treść notatki</label>
					<textarea id="content" v-model="noteContent" class="w-full px-3 py-2 border rounded"></textarea>
				</div>
				<div class="flex justify-end space-x-4">
					<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded" @click="saveEditedNote">Zapisz</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">

import {Note} from "@/types/note.model";
import {useNoteStore} from "@/stores/note.module";
import {ref} from "vue";

export default {
	name: "text-note",
	props: {
		note: {
			type: Object as () => Note,
			required: true
		}
	},
	setup(props) {
		const noteStore = useNoteStore();
		const showModelEdit = ref(false);
		const noteTitle = ref(props.note.title);
		const noteContent = ref(props.note.content);

		const showEdit = () => {
			showModelEdit.value = true;
		};

		const saveEditedNote = async () => {
			const updatedNote = new Note({
				...props.note,
				title: noteTitle.value,
				content: noteContent.value,
			});

			await noteStore.updateNote(props.note.id, updatedNote);
			showModelEdit.value = false;
		};

		const deleteNote = async () => {
			await noteStore.deleteNote(props.note.id);
		};

		return {
			showModelEdit,
			noteTitle,
			noteContent,
			showEdit,
			saveEditedNote,
			deleteNote
		};
	}
}
</script>

<style scoped>
.italic {
	font-style: italic;
}
</style>