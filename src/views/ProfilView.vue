<script setup lang="ts">
import Profil from '../components/ProfilPage.vue'
import Profile from '../components/Profil/ProfileComponent.vue'
import Notes from '../components/Profil/NotesComponent.vue'
import Proteges from '../components/Profil/ProtegesComponent.vue'
import CBTN from '../components/Profil/ChangePassword.vue'
import EBTN from '../components/Profil/EditProfile.vue'
import ABTN from '../components/Profil/AddProteges.vue'
import Proba from '../components/Profil/ChangeDDDD.vue'
import Calendar from '../components/Profil/CalendarComponent.vue'
</script>
<template>
<div>
<div class="grid grid-rows-3 grid-flow-col gap-4">
      <div>
      <div class="row-span-3"> <Profile /> 
      <div class="flex justify-center items-center py-2 px-2">
      <div><CBTN /> </div>
      <div><EBTN /> </div>
      <div> <Proba /> </div>
      <div> <Calendar /> </div>
      </div>
      </div>
      </div>
      <div class="row-span-3"> <Proteges /> 
      <div class="flex justify-center items-center py-2 px-2">
      <div><ABTN /> </div>
      </div>
      </div>          
    
</div>
<div class="grid grid-rows-3 grid-flow-col gap-4">
    <div class="row-span-3"> <Notes /> </div>
    <div class="row-span-3"> <Notes /> </div>
</div>
</div>

</template>



<style>
body {
  background-color: white;
}

</style>