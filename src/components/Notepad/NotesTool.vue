 <template>
  <notes-list :notes="notes" v-on:notesUpdated="fetchNotes">

  </notes-list>

  <create-notes>

  </create-notes>

</template>

<script lang="ts">
import NotesList from "@/components/Notepad/temp/notes-list.vue";
import CreateNotes from "@/components/Notepad/temp/create-notes.vue";
import {computed, getCurrentInstance, onMounted} from "vue";
import {useNoteStore} from "@/stores/note.module";
import {Note} from "@/types/note.model";

export default {
	name: 'NotesTool',
	components: {
		CreateNotes,
		NotesList
	},
	setup() {
		const noteStore = useNoteStore();
		const notes = computed(() => noteStore.getNotes);

		const fetchNotes = async (updatedNotes: Note[]) => {
			await noteStore.initStore();
		}

    return {
      notes,
			fetchNotes
    }
	},
}
</script>

<style scoped>

</style>