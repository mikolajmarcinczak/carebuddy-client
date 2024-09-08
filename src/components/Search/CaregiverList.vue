<template>
  <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

    <div v-if="isProtege" class="p-6 space-y-4 md:space-y-6 sm:p-8"> <!-- isProtege? -->

      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Wyszukaj opiekuna
      </h1>

      <div class="mb-4">
        <label for="city" class="block text-sm font-medium text-gray-700">Wybierz miasto</label>
        <input type="text" v-model="cityFilter" placeholder="Miasto"
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
      <div class="mb-4">
        <label for="search" class="block text-sm font-medium text-gray-700">Wyszukaj wg. nazwiska lub adresu email</label>
        <input type="text" v-model="searchQuery" placeholder="Nazwisko lub email"
               class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
      <ul class="space-y-2">
        <li v-for="caregiver in filteredCaregivers" :key="caregiver.id" class="p-4 border border-gray-300 rounded-md shadow-sm">
          <div class="text-lg text-primary-900 font-medium">{{ caregiver.name }}</div>
          <div class="text-sm text-gray-500">{{ caregiver.email }}</div>
          <div class="text-sm text-gray-500">{{ caregiver.city }}</div>
        </li>
      </ul>
    </div>
		<div v-else>
			<p class="text-lg font-medium">Lista opiekunów jest dostępna tylko dla podopiecznych.</p>
		</div>
  </div>
</template>

<script lang="ts">

import {computed, ref} from "vue";
import {useAuthStore} from "@/stores/auth.module";

export default {
	name: "CaregiverList",
	setup() {
    const authStore = useAuthStore();

		const caregivers = ref([
			{ id: 1, name: 'Jan Kowalski', email: 'jan.kowalski@example.com', city: 'Warszawa' },
			{ id: 2, name: 'Anna Nowak', email: 'anna.nowak@example.com', city: 'Kraków' },
			{ id: 3, name: 'Krysia Walec', email: 'krysia.walec@example.com', city: 'Kraków' },
		]);

    const isProtege = computed(() => authStore.$state.user?.role === 'elderly')

		const cityFilter = ref('');
		const searchQuery = ref('');

		const filteredCaregivers = computed(() => {
			return caregivers.value.filter(caregiver => {
				const matchCity  = caregiver.city.toLowerCase().includes(cityFilter.value.toLowerCase());
				const matchSearch = caregiver.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
													 caregiver.email.toLowerCase().includes(searchQuery.value.toLowerCase());

				return matchCity || matchSearch;
			});
		});

		return {
			caregivers,
			cityFilter,
			searchQuery,
			filteredCaregivers,
      isProtege
		}
	}
}
</script>

<style scoped>

</style>