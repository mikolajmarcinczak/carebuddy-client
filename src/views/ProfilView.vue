<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="md:col-span-1">
        <div class="row-span-3">
          <Profile :user-data="sampleUser"/>
          <div class="flex justify-center items-center py-2 px-2">
            
            <div><EditBtn /></div>
            <div><Proba /></div>
            <div><Calendar /></div>
          </div>
        </div>
      </div>
      <div class="md:col-span-1">
        <div class="row-span-3">
          <Proteges />
          <div class="flex justify-center items-center py-2 px-2">
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
import Profile from '../components/Profil/ElderlyProfile.vue'
import Notes from '../components/Profil/NotesComponent.vue'
import Proteges from '../components/Profil/ProtegesComponent.vue'
import CBTN from '../components/Profil/ChangePassword.vue'
import EditBtn from '../components/Profil/EditProfile.vue'
import ABTN from '../components/Profil/AddProteges.vue'
import Proba from '../components/Profil/ChangeDDDD.vue'
import Calendar from '../components/Profil/CalendarComponent.vue'
import {ElderlyProfile} from "@/types/elderly-profile.model";

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
	}
}
</script>

<style>
body {
  background-color: white;
}

</style>