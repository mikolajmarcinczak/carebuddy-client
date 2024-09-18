<template>
	<text-note v-for="note in notes" :key="note.id" :note="note" v-on:deleteNote="deleteNote" v-on:saveEditedNote="saveEditedNote" v-on:sendNote="sendNote"/>
</template>

<script lang="ts">
import textNote from "./text-note.vue";
import {useNoteStore} from "@/stores/note.module";
import {Note} from "@/types/note.model";
import {SendNoteParameters} from "@/types/send-note.parameters.model";
export default {
	name: "notes-list",
	props: ['notes'],
	components: {
		textNote
	},
	emits: ['notesUpdated'],
	setup(props, { emit }) {
		const noteStore = useNoteStore();

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