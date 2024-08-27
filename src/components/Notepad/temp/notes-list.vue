<template>
	<text-note v-for="note in notes" :key="note.id" :note="note" v-on:deleteNote="deleteNote"/>
</template>

<script lang="ts">
import textNote from "./text-note.vue";
import {useNoteStore} from "@/stores/note.module";
import {computed} from "vue";
export default {
	name: "notes-list",
	components: {
		textNote
	},
	setup() {
		const noteStore = useNoteStore();
		const notes = computed(() => noteStore.getNotes);

		const deleteNote = async (noteId: string) => {
			await noteStore.deleteNote(noteId);
		};

		return {
			notes,
			deleteNote
		};
	}
}
</script>

<style scoped>

</style>