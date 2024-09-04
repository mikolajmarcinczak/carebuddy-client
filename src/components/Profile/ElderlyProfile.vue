<template>
  <div class="flex flex-col items-center justify-center px-0 py-0 mx-auto md:mt-36 lg:py-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
    <div class="flex items-center justify-center">
      <div class="bg-white n-1/3 mt-10 rounded-lg">
        <div class="flex items-center justify-center flex-col">
          <img src="/src/assets/logo.jpg" alt="Logo CareBuddy">
          <h1 class="text-gray-800 mt-5"> Imię i nazwisko: {{userObject.user?.username}} </h1>
					<h1 class="text-gray-400 p-4"> Rola: {{userObject.user?.role}} </h1>
					<h1 class="text-gray-500 p-4 text-center"> O mnie: {{ userObject.about_me || 'Brak opisu'}} </h1>
					<h1 class="text-gray-400 p-4"> e-mail: {{ userObject.user?.email }} </h1>
					<h1 class="text-gray-400 p-4"> Adres zamieszkania: {{ userObject.address }}, {{ userObject.city }} </h1>
					<h1 class="text-gray-400 p-4"> Nr tel.: {{ userObject.phone_number }} </h1>
					<h1 class="text-gray-400 p-4"> Nr awaryjny: {{ userObject.emergency_number }} </h1>
					<h1 class="text-gray-400 p-4"> Wzrost: {{ userObject.height }} </h1>
					<h1 class="text-gray-400 p-4"> Waga: {{ userObject.weight }} </h1>
					<h1 class="text-gray-400 p-4"> Data urodzenia: {{ Date.parse(userObject.date_of_birth).valueOf() }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElderlyProfile } from "@/types/elderly-profile.model";
import {useAuthStore} from "@/stores/auth.module";

const authStore = useAuthStore();

export default {
	name: 'ElderlyProfile',
  props: {
    userData: {
      type: Object as () => ElderlyProfile,
      required: true,
      default: null
    }
  },
	computed: {
		currentUser() {
			return authStore.$state.user;
		},
    userObject() {
      return this.userData;
    }
	},
	mounted() {
		if (!this.currentUser) {
			this.$router.push('/login');
		}
	}
};


</script>

<style scoped>

</style>