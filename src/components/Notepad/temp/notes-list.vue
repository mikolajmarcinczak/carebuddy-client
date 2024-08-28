<template>
	<text-note v-for="note in notes" :key="note.id" :note="note" v-on:deleteNote="deleteNote"/>
</template>

<script lang="ts">
import textNote from "./text-note.vue";
import {useNoteStore} from "@/stores/note.module";
export default {
	name: "notes-list",
	props: ['notes'],
	components: {
		textNote
	},
	setup() {
		const noteStore = useNoteStore();

		const deleteNote = async (noteId: string) => {
			await noteStore.deleteNote(noteId);
		};

		return {
			deleteNote
		};
	}
}
</script>

<style scoped>

</style>