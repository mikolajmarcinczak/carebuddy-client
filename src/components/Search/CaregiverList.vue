<template>
  <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

    <div v-if="isProtege" class="p-6 space-y-4 md:space-y-6 sm:p-8">

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
        <MultiselectSearch v-model:selected-users="selectedUsers" :options="caregiverOptions" />
      </div>
      <ul class="space-y-2">
        <li v-for="caregiver in filteredCaregivers" :key="caregiver.user?.user_id" class="p-4 border border-gray-300 rounded-md shadow-sm">
          <img :src="caregiver.user?.image_url" alt="Profile Picture" class="w-12 h-12 rounded-full">
          <div class="text-lg font-medium">{{ caregiver.user?.username }}</div>
          <div class="text-sm text-gray-500">{{ caregiver.user?.email }}</div>
          <div class="text-sm text-gray-500">{{ caregiver.city }}</div>
          <button @click="viewProfile((caregiver.user as User).user_id)" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">
            Zobacz profil
          </button>
        </li>
      </ul>
    </div>
		<div v-else>
			<p class="text-lg font-medium">Lista opiekunów jest dostępna tylko dla podopiecznych.</p>
		</div>
  </div>
</template>

<script lang="ts">
import {computed, onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/auth.module";
import {useUserDataStore} from "@/stores/user-data.module";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {User} from "@/types/user.model";
import MultiselectSearch from "@/components/Search/MultiselectSearch.vue";

export default {
	name: "CaregiverList",
  components: {
    MultiselectSearch
  },
	setup() {
    const authStore = useAuthStore();
    const userDataStore = useUserDataStore();

    const isProtege = computed(() => authStore.$state.user?.role == 'elderly')

		const caregivers = ref<CaregiverProfile[]>([]);
    const caregiverOptions = ref<User[]>([]);
    const selectedUsers = ref<User[]>([]);

    const cityFilter = ref('');

		const filteredCaregivers = computed<CaregiverProfile[]>(() => {
      return caregivers.value.filter(caregiver => {
        const matchCity = caregiver.city.toLowerCase().includes(cityFilter.value.toLowerCase());
        const matchSearch = selectedUsers.value.some(user => user.user_id === caregiver.user?.user_id);
        return matchCity || matchSearch;
      });
		});

    const loadAllCaregivers = async () => {
      const allCaregivers = await userDataStore.getUsersByRole('caregiver') as User[];
      for (const caregiver of allCaregivers) {
        const caregiverData = await userDataStore.getUserData(caregiver.email, 'caregiver') as CaregiverProfile;
        if (caregiverData && caregiverData.user) {
          caregivers.value.push(caregiverData);
        }
      }
      caregiverOptions.value = allCaregivers as User[];
    };

    onMounted(async () => {
      if (isProtege.value) {
        await loadAllCaregivers();
      }
    });

		return {
			caregiverOptions,
			cityFilter,
			selectedUsers,
			filteredCaregivers,
      isProtege
		}
	},
  methods: {
    viewProfile(caregiverId: string) {
      this.$router.push(`/profile/${caregiverId}`);
    }
  }
}
</script>

<style scoped>

</style>