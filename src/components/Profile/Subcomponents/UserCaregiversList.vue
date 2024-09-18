<template>
  <div class="flex flex-col items-center justify-center mt-10 md:mt-36 shadow-lg p-6 bg-gray-800 rounded-lg">
    <h2 class="text-2xl text-gray-200 font-semibold mb-4">Przypisani Opiekunowie: </h2>
    <ul class="w-full">
      <li v-if="caregivers.length === 0" class="text-center text-gray-400">
        Brak przypisanych opiekunów.
      </li>
      <li v-for="caregiver in caregivers" :key="caregiver.user?.user_id">
				<SimpleUserProfile :user-data="caregiver" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {useUserDataStore} from "@/stores/user-data.module";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {onMounted, ref} from "vue";
import {User} from "@/types/user.model";
import SimpleUserProfile from "@/components/Profile/SimpleUserProfile.vue";

export default {
	components: {
		SimpleUserProfile
	},
  setup() {
    const userDataStore = useUserDataStore();
    const caregivers = ref<CaregiverProfile[]>([]);

    onMounted(async () => {
			const fetchedUsers = userDataStore.getCaregivers;
			console.log('fetchedUsers: ', fetchedUsers);
      caregivers.value = fetchedUsers || [];
    });

    return {
      caregivers
    };
  }
}
</script>

<style scoped>

</style>