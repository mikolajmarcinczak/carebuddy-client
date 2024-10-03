<template>
  <div class="w-full min-w-full container mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

		<div v-if="loading">
			<p>Loading...</p>
		</div>

    <div v-if="isProtege" class="p-6 space-y-4 md:space-y-6 sm:p-8">

      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Wyszukaj opiekuna
      </h1>

      <div class="mb-4">
        <label for="city" class="block text-sm font-medium text-gray-300">Wybierz miasto</label>
        <input type="text" v-model="cityFilter" placeholder="Miasto"
               class="text-gray-800 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
      <ul class="space-y-2">
				<li v-for="caregiver in filteredCaregivers" :key="caregiver.user?.user_id">
					<SimpleUserProfile :user-data="caregiver" />
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
import SimpleUserProfile from "@/components/Profile/SimpleUserProfile.vue";

export default {
	name: "CaregiverList",
  components: {
    SimpleUserProfile
  },
	setup() {
    const authStore = useAuthStore();
    const userDataStore = useUserDataStore();
		const loading = ref(true);

    const isProtege = computed(() => authStore.$state.user?.role == 'elderly')

		const caregivers = ref<CaregiverProfile[]>([]);
    const caregiverOptions = ref<User[]>([]);
    const selectedUsers = ref<User[]>([]);

    const cityFilter = ref('');

		const filteredCaregivers = computed<CaregiverProfile[]>(() => {
      return caregivers.value.filter(caregiver => {
        const matchCity = caregiver.city.toLowerCase().includes(cityFilter.value.toLowerCase());
        return matchCity;
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
			loading.value = false;
    });

		return {
			caregiverOptions,
			cityFilter,
			selectedUsers,
			filteredCaregivers,
      isProtege
		}
	}
}
</script>

<style scoped>

</style>