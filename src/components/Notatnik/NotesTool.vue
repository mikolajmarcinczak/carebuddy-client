<template>
  <NotesList :notes="['eciepecie', 'meciemiecie']">

  </NotesList>
  <SingleNote>
    
  </SingleNote>

  <AddNewNoteButton>

  </AddNewNoteButton>

</template>

<script lang="ts">
import AddNewNoteButton from "@/components/Notatnik/AddNewNoteButton.vue";
import NotesList from "@/components/Notatnik/NotesList.vue";
import SingleNote from "@/components/Notatnik/SingleNote.vue";

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