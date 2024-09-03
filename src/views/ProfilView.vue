<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="md:col-span-1">
        <div class="row-span-3">
          <Profile :elderly-data="userElderlyProfile" :caregiver-data="userCaregiverProfile"/>
          <div class="flex justify-center items-center py-3 px-3">
            
            <div><EditBtn ref="editBtn" /></div>
            <div><Proba /></div>
            <div><Calendar /></div>
            <div><NotesBtn /></div>
          </div>
        </div>
      </div>
      <div class="md:col-span-1">
        <div class="row-span-3">
          <Proteges />
          <div class="flex justify-center items-center py-3 px-3">
            <div><AddProtege /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="row-span-3"><Notes /></div>
      <div class="row-span-3"><Notes /></div>
    </div>
  </div>
</template>

<script lang="ts">
import Profile from '@/components/Profile/ProfileWrapper.vue'
import Notes from '@/components/Profile/NotesComponent.vue'
import Proteges from '@/components/Profile/ProtegesComponent.vue'
import CBTN from '@/components/Profile/ChangePassword.vue'
import EditBtn from '@/components/Profile/EditProfile.vue'
import NotesBtn from "@/components/Profile/NotesButton.vue";
import AddProtege from '@/components/Profile/AddProteges.vue'
import Proba from '@/components/Profile/ChangeDDDD.vue'
import Calendar from '@/components/Profile/CalendarComponent.vue'
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {computed, getCurrentInstance, onMounted, ref} from "vue";
import {useUserDataStore} from "@/stores/user-data.module";
import {useAuthStore} from "@/stores/auth.module";

export default {
	components: {
    NotesBtn,
		Profile,
		Notes,
		Proteges,
		CBTN,
		EditBtn,
		AddProtege,
		Proba,
		Calendar
	},
	setup() {
    const authStore = useAuthStore();
    const userDataStore = useUserDataStore();
    const editBtn = ref<InstanceType<typeof EditBtn> | null>(null);
		const instance = getCurrentInstance();

		onMounted(async () => {
      await userDataStore.fetchUserProfile()

      console.log(userElderlyProfile.value)
      console.log(userCaregiverProfile.value)
      console.log(userDataStore.getUserProfile)

			if (instance?.proxy?.$route.query.edit === 'true') {
				editBtn.value?.openModal();
			}
		});

    const userElderlyProfile = computed(() => {
      if (authStore.user?.role === 'elderly') {
        return userDataStore.getUserProfile as ElderlyProfile;
      }
      return null;
    });

    const userCaregiverProfile = computed(() => {
      if (authStore.user?.role === 'caregiver') {
        return userDataStore.getUserProfile as CaregiverProfile;
      }
      return null;
    });

		return {
      userCaregiverProfile,
      userElderlyProfile,
			editBtn
		};
	}
}
</script>

<style scoped>

</style>