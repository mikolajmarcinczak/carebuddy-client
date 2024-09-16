<template>
  <footer class="relative left-0 bottom-0 w-[100%] p-4 bg-white sm:p-6 dark:bg-gray-800">
    <div class="mx-auto max-w-screen-xl">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <router-link to ="/"><a href="/" class="flex items-center">
            <img src="/src/assets/logo.jpg" class="mr-3 h-8" alt="CareBuddy Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CareBuddy</span>
          </a></router-link>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Zasoby</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-4">
                <router-link to ="/" class="hover:underline">CareBuddy</router-link>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Obserwuj nas</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-4">
                <a href="https://github.com/mikolajmarcinczak" class="hover:underline ">Github</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Prawa</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-4">
                <a href="/" class="hover:underline">Polityka Prywatności</a>
              </li>
              <li>
                <a href="/" class="hover:underline">Zasady i Warunki</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <p>&copy; 2023 - 2024 Mikołaj Marcińczak</p>
    </div>
  </footer>
</template>

<script lang="ts">

export default {
  name: "FooterComponent"
}
</script>

<style scoped>
</style>