<template>
  <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

    <div v-if="isCaregiver" class="p-6 space-y-4 md:space-y-6 sm:p-8">

      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Lista Podopiecznych
      </h1>

      <ul class="space-y-2">
        <li v-for="protege in proteges" :key="protege.id" class="p-4 border border-gray-300 rounded-md shadow-sm">
          <div class="text-lg font-medium">{{ protege.name }}</div>
          <div class="text-sm text-gray-500">{{ protege.email }}</div>
          <div class="text-sm text-gray-500">{{ protege.city }}</div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="text-lg font-medium">Lista podopiecznych jest dostępna tylko dla opiekunów.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth.module';
import {computed, ref} from "vue";

export default {
	name: 'ProtegeList',
	setup() {
		const authStore = useAuthStore();
		const proteges = ref([
			{ id: 1, name: 'Jan Kowalski', email: 'jan.kowalski@example.com', city: 'Warszawa' },
			{ id: 2, name: 'Anna Nowak', email: 'anna.nowak@example.com', city: 'Kraków' },
		]);

		const isCaregiver = computed(() => authStore.user?.type === 'caregiver');

		return {
			proteges,
			isCaregiver
		};
	}
}
</script>

<style scoped>
/* Add your styles here */
</style>