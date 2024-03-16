<template>
  <section class="bg-white dark:bg-green-950">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
    </div>
  </section>
<section class="bg-white dark:bg-green-950">
<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">

  <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Inwestujemy w przyszłość Seniorów i ich Rodzin</h1>
  <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-white">W CareBuddy koncentrujemy się na asystowaniu tym, którzy tego potrzebują. Ta innowacja może odblokować długoterminową wartość i pomóc w opiece nad bliskimi..</p>
  <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
    <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
      <router-link to="/rejestracja-konta"> Stwórz swoje konto asystenta</router-link>
      <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
    <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
      <svg class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
       Wideo prezentacja
    </a>
  </div>
</div>
</section>
  <section class="bg-white dark:bg-green-950">
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
      <div class="font-light text-gray-500 sm:text-lg dark:text-white">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">To rozwiązanie realnie wspomoże Ciebie i Twoich bliskich.</h2>
        <p class="mb-4">Jesteśmy projektantami i programistami. Innowatorzy i osoby rozwiązujące problemy. Wystarczająco mały (zespół), aby był prosty i szybki, ale wystarczająco duży, aby zapewnić potrzebną pomoc.</p>
        <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum.</p>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <img class="w-full rounded-lg" src="https://images.unsplash.com/photo-1580869318757-a6c605b061ed?q=80&w=3265&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="office content 1">
        <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://images.unsplash.com/photo-1658314755707-1fbdf7c40145?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="office content 2">
      </div>
    </div>
  </section>
  <footer class="p-4 bg-white sm:p-6 dark:bg-gray-800">
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
                <router-link to ="/"><a href="" class="hover:underline">Care Buddy</a></router-link>
              </li>
              <li>
                <a class="hover:underline"> <router-link to ="/tutorial">Baza Wiedzy </router-link></a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Obserwuj nas</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-4">
                <a href="https://github.com/Inzynierka-CDV-2024G3/carebuddy-client" class="hover:underline ">Github</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Prawa</h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-4">
                <a href="#" class="hover:underline">Polityka Prywatności</a>
              </li>
              <li>
                <a href="#" class="hover:underline">Zasady i Warunki</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    </div>
  </footer>

</template>

<script setup lang="ts">

</script>