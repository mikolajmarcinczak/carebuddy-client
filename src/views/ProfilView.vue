<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="md:col-span-1">
        <div class="row-span-3">
          <Profile :user-data="sampleUser"/>
          <div class="flex justify-center items-center py-3 px-3">
            
            <div><EditBtn ref="editBtn" /></div>
            <div><Proba /></div>
            <div><Calendar /></div>
          </div>
        </div>
      </div>
      <div class="md:col-span-1">
        <div class="row-span-3">
          <Proteges />
          <div class="flex justify-center items-center py-3 px-3">
            <div><ABTN /></div>
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
import Profile from '@/components/Profile/ElderlyProfile.vue'
import Notes from '@/components/Profile/NotesComponent.vue'
import Proteges from '@/components/Profile/ProtegesComponent.vue'
import CBTN from '@/components/Profile/ChangePassword.vue'
import EditBtn from '@/components/Profile/EditProfile.vue'
import ABTN from '@/components/Profile/AddProteges.vue'
import Proba from '@/components/Profile/ChangeDDDD.vue'
import Calendar from '@/components/Profile/CalendarComponent.vue'
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {getCurrentInstance, onMounted, ref} from "vue";

export default {
	data() {
		return {
			sampleUser: ElderlyProfile
		}
	},
	components: {
		Profile,
		Notes,
		Proteges,
		CBTN,
		EditBtn,
		ABTN,
		Proba,
		Calendar
	},
	setup() {
		const editBtn = ref<InstanceType<typeof EditBtn> | null>(null);
		const instance = getCurrentInstance();

		onMounted(() => {
			if (instance?.proxy?.$route.query.edit === 'true') {
				editBtn.value?.openModal();
			}
		});

		return {
			editBtn
		};
	}
}
</script>

<style scoped>

</style>