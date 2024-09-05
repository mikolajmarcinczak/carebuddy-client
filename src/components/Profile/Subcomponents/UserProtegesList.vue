<template>
  <div class="flex flex-col items-center justify-center mt-10 md:mt-36 shadow-lg p-6 bg-white rounded-lg">
    <h2 class="text-2xl text-gray-800 font-semibold mb-4">Podopieczni: </h2>
    <ul class="w-full">
      <li v-if="proteges.length === 0" class="text-center text-gray-400">
        Brak przypisanych podopiecznych.
      </li>
      <li v-for="protege in proteges" :key="protege.user?.user_id"
          class="flex justify-between items-center p-4 mb-2 bg-gray-100 rounded-lg shadow-sm">
        <span @click="viewProfile(protege.user?.user_id || '')"
              class="cursor-pointer text-blue-600 hover:underline">
          {{ protege.user?.user_id }}</span>
        <button @click="unassignCare(protege.user?.user_id || '')"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Zakończ opiekę</button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {useUserDataStore} from "@/stores/user-data.module";
import {onMounted, ref} from "vue";
import {ElderlyProfile} from "@/types/elderly-profile.model";

export default {
  setup() {
    const userDataStore = useUserDataStore();
    const proteges = ref<ElderlyProfile[]>([]);

    onMounted(async () => {
      const fetchedUsers = await userDataStore.fetchProteges();
      proteges.value = fetchedUsers || [];
    });

    const unassignCare = async (elderlyId: string) => {
      await userDataStore.unassignCare(elderlyId);
      proteges.value = proteges.value.filter(protege => protege.user?.user_id !== elderlyId);
    };

    return {
      proteges,
      unassignCare
    };
  },
  methods: {
    viewProfile(elderlyId: string) {
      this.$router.push(`/profile/${elderlyId}`);
    }
  }
};
</script>

<style scoped>
</style>