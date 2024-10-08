<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="md:col-span-1">
        <div class="row-span-3">
          <Profile :elderly-data="userElderlyProfile" :caregiver-data="userCaregiverProfile"/>
          <div class="flex justify-center items-center py-3 px-3">
            
            <div><EditBtn ref="editBtn" :disable-close="disableClose" :initial-data="initialProfileData" /></div>
            <div><Proba /></div>
            <div><Calendar /></div>
            <div><NotesBtn /></div>
          </div>
        </div>
      </div>
      <div class="md:col-span-1">
        <div v-if="currentUser?.role === 'caregiver'" class="row-span-3">
          <Proteges />
          <div class="flex justify-center items-center py-3 px-3">
            <div><AddProtege /></div>
          </div>
        </div>
        <div v-if="currentUser?.role === 'elderly'" class="row-span-3">
          <Caregivers />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <notes-list :notes="notes" v-on:notesUpdated="fetchNotes"></notes-list>
    </div>
  </div>
</template>

<script lang="ts">
import Profile from '@/components/Profile/ProfileWrapper.vue'
import Notes from '@/components/Notepad/NotesDummy.vue'
import Proteges from '@/components/Profile/Subcomponents/UserProtegesList.vue'
import Caregivers from '@/components/Profile/Subcomponents/UserCaregiversList.vue'
import EditBtn from '@/components/Profile/ProfileButtons/EditProfile.vue'
import NotesBtn from "@/components/Profile/ProfileButtons/NotesButton.vue";
import AddProtege from '@/components/Profile/ProfileButtons/AddProteges.vue'
import Proba from '@/components/Profile/ProfileButtons/ChangeDDDD.vue'
import Calendar from '@/components/Profile/ProfileButtons/CalendarButton.vue'
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {computed, getCurrentInstance, onMounted, ref} from "vue";
import {useUserDataStore} from "@/stores/user-data.module";
import {useAuthStore} from "@/stores/auth.module";
import {useRouter} from "vue-router";
import NotesList from "@/components/Notepad/temp/notes-list.vue";
import {useNoteStore} from "@/stores/note.module";
import {Note} from "@/types/note.model";

export default {
	components: {
		NotesList,
    NotesBtn,
		Profile,
		Notes,
		Proteges,
		EditBtn,
		AddProtege,
		Proba,
		Calendar,
    Caregivers
	},
	setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const userDataStore = useUserDataStore();
		const noteStore = useNoteStore();
    const editBtn = ref<InstanceType<typeof EditBtn> | null>(null);
		const instance = getCurrentInstance();
    const currentUser = computed(() => authStore.$state.user || null);
    const disableClose = ref(false);
    const initialProfileData = ref({});

		const notes = computed(() => noteStore.getNotes);

		onMounted(async () => {
      try {
        if (currentUser.value === null || currentUser.value === undefined) {
          return router.push('/login');
        }

        await userDataStore.fetchUserProfile()

        if (instance?.proxy?.$route.query.edit === 'true') {
          disableClose.value = true;
          editBtn.value?.openModal();
        }

        const userProfile = userDataStore.getUserProfile;
        console.log(userProfile);
        if (currentUser.value.role === 'elderly') {
          initialProfileData.value = userProfile as ElderlyProfile;
        } else if (currentUser.value.role === 'caregiver') {
          initialProfileData.value = userProfile as CaregiverProfile;
        } else {
          initialProfileData.value = {username: currentUser.value?.username, image_url: currentUser.value?.image_url};
        }
      } catch (error) {
        console.error(error);
      }
		});

		const fetchNotes = async (updatedNotes: Note[]) => {
			await noteStore.initStore();
		}

    const userElderlyProfile = computed(() => {
      if (authStore.$state.user?.role === 'elderly') {
        return userDataStore.getUserProfile as ElderlyProfile;
      }
      return undefined;
    });

    const userCaregiverProfile = computed(() => {
      if (authStore.$state.user?.role === 'caregiver') {
        return userDataStore.getUserProfile as CaregiverProfile;
      }
      return undefined;
    });

    console.log(userElderlyProfile.value)
    console.log(userCaregiverProfile.value)
    console.log(userDataStore.getUserProfile)

		return {
			notes,
      authStore,
      userCaregiverProfile,
      userElderlyProfile,
      currentUser,
      disableClose,
      initialProfileData,
			editBtn,
			fetchNotes
		};
	},
}
</script>

<style scoped>

</style>