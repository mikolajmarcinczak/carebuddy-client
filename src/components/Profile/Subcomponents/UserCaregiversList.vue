<template>
  <div class="flex flex-col items-center justify-center mt-10 md:mt-36 shadow-lg p-6 bg-white rounded-lg">
    <h2 class="text-2xl text-gray-800 font-semibold mb-4">Przypisani Opiekunowie: </h2>
    <ul class="w-full">
      <li v-if="caregivers.length === 0" class="text-center text-gray-400">
        Brak przypisanych opiekunów.
      </li>
      <li v-for="caregiver in caregivers" :key="caregiver.user?.user_id"
          class="flex justify-between items-center p-4 mb-2 bg-gray-100 rounded-lg shadow-sm">
        <span @click="viewProfile(caregiver.user?.user_id || '')"
              class="cursor-pointer text-blue-600 hover:underline">
          {{ caregiver.user?.user_id }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {useUserDataStore} from "@/stores/user-data.module";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {onMounted, ref} from "vue";

export default {
  setup() {
    const userDataStore = useUserDataStore();
    const caregivers = ref<CaregiverProfile[]>([]);

    onMounted(async () => {
      const fetchedUsers = await userDataStore.fetchCaregivers();
      caregivers.value = fetchedUsers || [];
    });

    return {
      caregivers
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