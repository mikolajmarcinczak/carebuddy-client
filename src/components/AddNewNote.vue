<script setup lang="ts">

</script>

<template>
  <section>
  <div class="mx-auto flex flex-col justify-between dark:bg-yellow-200 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
    <div>
      <form class="max-w-sm mx-auto">
        <label for="newnote" class="block mb-2 text-xl font-medium text-black dark:text-black">Twoja notatka</label>
        <textarea id="newnote" rows="4" class="block p-2.5 w-full text-xl text-black bg-yellow-200 rounded-lg border border-yellow-200 focus:ring-yellow-300 focus:border-gray-700 dark:bg-yellow-200 dark:border-gray-700 dark:placeholder-black dark:text-black dark:focus:ring-gray-700 dark:focus:border-gray-700" placeholder="Wprowadź tekst..."></textarea>
      </form>
    </div>
  </div>
  </section>
  <section>
    <div>
      <div class="flex items-center justify-between text-gray-800 dark:text-black">
        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Zapisz</button>
      </div>
    </div>
  </section>

  <section>
    <div>
      <div class="mx-auto flex flex-col justify-between bg-black mb-6 px-4"></div>
    </div>
  </section>

  <section>
    <div>
      <div class="flex items-center justify-between text-gray-800 dark:text-black">
        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          <router-link to="/notatki-użytkownika"> Wróć </router-link>
        </button>
      </div>
    </div>
  </section>




</template>

<style scoped>

</style>