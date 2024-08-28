<template>
  <notes-list :notes="notes">

  </notes-list>
  <SingleNote>
    
  </SingleNote>

  <create-notes>

  </create-notes>

</template>

<script lang="ts">
import NotesList from "@/components/Notepad/temp/notes-list.vue";
import SingleNote from "@/components/Notepad/SingleNote.vue";
import CreateNotes from "@/components/Notepad/temp/create-notes.vue";
import {computed} from "vue";
import {useNoteStore} from "@/stores/note.module";

export default {
	name: 'NotesTool',
	components: {
		CreateNotes,
		SingleNote,
		NotesList
	},
	setup(props) {
		const noteStore = useNoteStore();
		const notes = computed(() => noteStore.getNotes);
	},
	data() {
		return {
			notes: [
				{ title: "Zjedz leki", content: "1 rano 1 wieczorem", creationDate: new Date().toLocaleString(), user: 'gienio' },
				{ title: "Zastrzyk z insuliną", content: "1 rano, asystowany przez małżonkę", creationDate: new Date().toLocaleString(), user: 'gienio' },
				{ title: "Zjedz śniadanie", content: "1 rano, asystowany przez małżonkę", creationDate: new Date().toLocaleString(), user: 'lucek' }
			]
		}
	},
}
</script>

<style scoped>

</style>