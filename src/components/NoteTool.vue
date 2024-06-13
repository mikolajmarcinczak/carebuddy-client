<template>
  <div class="mx-auto container py20 px-2">
  <div class="flex items-center justify-between text-xl text-white">
    <p class="text-xl "><router-link to="/dodawanie-notatki"> Dodaj nową notatkę</router-link></p>
    <button class="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-black text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500" aria-label="edit note" role="button">
      <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"></path>
        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
      </svg>
    </button>
  </div>
  </div>
  <div class="mx-auto container py-20 px-2">

    <div class="w-full h-64 flex flex-col justify-between dark:bg-yellow-200 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
      <div>
        <h4 class="text-gray-800 dark:text-black font-bold mb-3">Zakupy dla Pani Jadwigi</h4>
        <p class="text-gray-800 dark:text-blacktext-m">- bułki </p>
        <p class="text-gray-800 dark:text-blacktext-m">- ser </p>
        <p class="text-gray-800 dark:text-blacktext-m">- mleko </p>
      </div>
      <div>
        <div class="flex items-center justify-between text-gray-800 dark:text-black">
          <p class="text-sm">Marzec 11, 2024</p>
          <button class="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-black text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500" aria-label="edit note" role="button">
            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="w-full h-64 flex flex-col justify-between dark:bg-yellow-200 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
      <div>
        <h4 class="text-gray-800 dark:text-black font-bold mb-3">Spacer z fafikiem</h4>
        <p class="text-gray-800 dark:text-blacktext-m">30min w parku xyz</p>

      </div>
      <div>
        <div class="flex items-center justify-between text-gray-800 dark:text-black">
          <p class="text-sm">Marzec 11, 2024</p>
          <button class="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-black text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-yellow-500" aria-label="edit note" role="button">
            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

</template>
<script lang="ts">
export default {
	name: 'NoteTool',
	components: {
	}
}
</script>