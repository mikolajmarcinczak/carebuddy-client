<template>
  <div class="w-full min-w-full container mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

    <div v-if="isCaregiver" class="p-6 space-y-4 md:space-y-6 sm:p-8">

      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Lista Podopiecznych
      </h1>

      <ul class="space-y-2">
        <li v-for="protege in proteges" :key="protege.user?.user_id" class="p-4 border border-gray-300 rounded-md shadow-sm">
          <div class="text-lg font-medium">{{ protege.user?.username }}</div>
          <div class="text-sm text-gray-500">{{ protege.user?.email }}</div>
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
import {computed, onMounted, ref} from "vue";
import MultiselectSearch from "@/components/Search/MultiselectSearch.vue";
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {useUserDataStore} from "@/stores/user-data.module";
import {User} from "@/types/user.model";

export default {
	name: 'ProtegeList',
  components: {
    MultiselectSearch,
  },
	setup() {
		const authStore = useAuthStore();
    const userDataStore = useUserDataStore();

    const isCaregiver = computed(() =>  authStore.$state.user?.role == 'caregiver');

		const proteges = ref<ElderlyProfile[]>([]);
    const protegeOptions = ref<User[]>([]);
    const selectedUsers = ref<User[]>([]);

    const cityFilter = ref('');

    const loadAllProteges = async () => {
      const allProteges = await userDataStore.getUsersByRole('elderly') as User[];
      for (const protege of allProteges) {
        const elderlyData = await userDataStore.getUserData(protege.user_id, 'elderly') as ElderlyProfile;
        if (elderlyData && elderlyData.user) {
          proteges.value.push(elderlyData);
        }
      }
      protegeOptions.value = allProteges as User[];
    };

    onMounted(async () => {
      if (isCaregiver.value) {
        await loadAllProteges();
      }
    });

		return {
			proteges,
			isCaregiver
		};
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