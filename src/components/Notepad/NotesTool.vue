<template>
  <NotesList :notes="['eciepecie', 'meciemiecie']">

  </NotesList>
  <SingleNote>
    
  </SingleNote>

  <AddNewNoteButton>

  </AddNewNoteButton>

</template>

<script lang="ts">
import AddNewNoteButton from "@/components/Notepad/AddNewNoteButton.vue";
import NotesList from "@/components/Notepad/NotesList.vue";
import SingleNote from "@/components/Notepad/SingleNote.vue";

export default {
	name: 'NotesTool',
	components: {
		AddNewNoteButton,
		NotesList,
		SingleNote
	}
}
</script>

<style scoped>


</style>