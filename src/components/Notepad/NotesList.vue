<template>
  <div>
    <h2 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Twoje Notatki
    </h2>
    <ul v-for="note in notes">
      <li>
        {{ note.valueOf() }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
	name: 'NotesList',
  props: {
    notes: {
      type: Array<String>,
      required: true
    }
  }
}
</script>

<style scoped>

</style>