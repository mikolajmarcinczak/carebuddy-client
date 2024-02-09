<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
name: 'BaseButton',
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

.dangerBtn {
  background-color: #881100;
  border-color: #881100;
}

.dangerBtn:hover,
.dangerBtn:active {
  background-color: #882222;
  border-radius: 1em;
}

.flat {
  background-color: transparent;
  color: #003831;
  border: none;
}

.flat:hover,
.flat:active {
  background-color: #d2edff;
  border-radius: 1em;
}
</style>