<template>
  <div>
    <button @click="navigateToCalendar"
						class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
						 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg
						  text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">
      Kalendarz
    </button>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    navigateToCalendar() {
      // Tutaj używamy routera do nawigacji do odpowiedniego adresu URL
      this.$router.push('/kalendarz');
    }
  }
};
</script>

<style>
/* Stylizacja przycisku */
</style>