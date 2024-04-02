<template>
  <div>
    <h2 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Twoje Notatki
    </h2>
    <ul>
      <li v-for="note in notes" :key="note.id">
        {{ note.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>