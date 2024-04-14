
<template>
  <button :class="mode">
    <slot>
      Dodaj nową notatkę
    </slot>
  </button>
</template>


<script>
export default {
  name: 'AddNewNoteButton',
  props: ['mode']
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

button:hover,
button:active {
  background-color: #003931;
  border-color: #003539;
}

</style>