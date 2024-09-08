 <template>
  <notes-list :notes="notes">

  </notes-list>

  <create-notes>

  </create-notes>

</template>

<script lang="ts">
import NotesList from "@/components/Notepad/temp/notes-list.vue";
import CreateNotes from "@/components/Notepad/temp/create-notes.vue";
import {computed} from "vue";
import {useNoteStore} from "@/stores/note.module";

export default {
	name: 'NotesTool',
	components: {
		CreateNotes,
		NotesList
	},
	setup(props) {
		const noteStore = useNoteStore();
		const notes = computed(() => noteStore.getNotes);

    return {
      notes
    }
	},
}
</script>

<style scoped>

</style>