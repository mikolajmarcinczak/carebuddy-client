<template>
  <div v-if="!loading">
    <Profile :elderly-data="userElderlyProfile" :caregiver-data="userCaregiverProfile"/>
  </div>
</template>

<script lang="ts">
import Profile from "@/components/Profile/ProfileWrapper.vue";
import {useRoute} from "vue-router";
import {useUserDataStore} from "@/stores/user-data.module";
import {onMounted, ref} from "vue";
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {User} from "@/types/user.model";

export default {
  name: "DynamicProfileView",
  components: {
    Profile
  },
  setup() {
    const route = useRoute();
    const userDataStore = useUserDataStore();
    const userElderlyProfile = ref<ElderlyProfile | undefined>(undefined);
    const userCaregiverProfile = ref<CaregiverProfile | undefined>(undefined);
		const loading = ref(true);

    onMounted(async () => {
      const userId = route.params.caregiverId as string;
      const userDetails = await userDataStore.getSimpleUserById(userId) as User;
      const userData = await userDataStore.getUserData(userId, userDetails.role) as ElderlyProfile | CaregiverProfile;
      if (userData) {
        if (userDetails.role === 'elderly') {
          userElderlyProfile.value = userData as ElderlyProfile;
        } else if (userDetails.role === 'caregiver') {
          userCaregiverProfile.value = userData as CaregiverProfile;
        }
        console.log(userData);
				loading.value = false;
      }
    });

    return {
      userElderlyProfile,
      userCaregiverProfile,
			loading
    }
  }
}
</script>

<style scoped>

</style>