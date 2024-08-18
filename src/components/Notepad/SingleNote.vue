<template>
  <div>

    <form @submit.prevent="addNote">
      <input type="text" v-model="newNote.title" placeholder="Tytuł" required>
      <textarea v-model="newNote.content" placeholder="Zacznij pisać..." required>

      </textarea>

      <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Zapisz
      </button>

    </form>
  </div>
</template>

<script lang="ts">
export default {
	name: 'NoteForm',
  data() {
    return {
      newNote: {
        title: '',
        content: ''
      }
    };
  },
  methods: {
    addNote() {
      this.$emit('add-note', this.newNote);
      this.newNote.title = '';
      this.newNote.content = '';
    }
  }
}
</script>

<style scoped>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #003831;
  border: 1px solid #003831;
  color: white;
  cursor: pointer;
  max-width: 40em;
  border-radius: 1em;
  margin-left: 2em;
}
</style>