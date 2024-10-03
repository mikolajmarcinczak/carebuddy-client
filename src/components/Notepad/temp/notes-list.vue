<template>
	<div>
	<div v-if="loading">
		<p>Loading...</p>
	</div>
	<text-note v-for="note in notes" :key="note.id" :note="note" v-on:deleteNote="deleteNote" v-on:saveEditedNote="saveEditedNote" v-on:sendNote="sendNote"/>
	</div>
</template>

<script lang="ts">
import textNote from "./text-note.vue";
import {useNoteStore} from "@/stores/note.module";
import {Note} from "@/types/note.model";
import {SendNoteParameters} from "@/types/send-note.parameters.model";
import {onMounted, ref} from "vue";
export default {
	name: "notes-list",
	props: ['notes'],
	components: {
		textNote
	},
	emits: ['notesUpdated'],
	setup(props, { emit }) {
		const noteStore = useNoteStore();
		const loading = ref(true);

		const deleteNote = async (noteId: string) => {
			await noteStore.deleteNote(noteId);
		};

		const saveEditedNote = async (noteId: string, updatedContent: Note) => {
			await noteStore.updateNote(noteId, updatedContent);
			emit('notesUpdated', noteStore.getNotes);
		};

		const sendNote = async (note: SendNoteParameters) => {
			await noteStore.sendNote(note);
		};

		onMounted(async () => {
			try {
				await noteStore.initStore();
			} catch (error) {
				console.error(error);
			} finally {
				loading.value = false;
			}
		});

		return {
			deleteNote,
			saveEditedNote,
			sendNote
		};
	}
}
</script>

<style scoped>

</style>