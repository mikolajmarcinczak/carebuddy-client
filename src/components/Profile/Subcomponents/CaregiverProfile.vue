<template xmlns="http://www.w3.org/1999/html">
	<div class="flex flex-col items-center justify-center px-0 py-0 mx-auto md:mt-36 lg:py-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
		<div class="flex items-center justify-center">
			<div class="bg-white n-1/3 mt-10 rounded-lg">
				<div class="flex items-center justify-center flex-col">
					<img :src="userObject.user?.image_url.length !== 0 ? userObject.user?.image_url : '/src/assets/logo.jpg'" alt="Obraz profilowy">
					<h1 class="text-gray-800 font-semibold mt-5"> Imię i nazwisko: </h1><p class="text-slate-800"> {{userObject.user?.username}} </p>
					<h2 class="text-gray-400 font-semibold mt-3"> Rola: </h2><p class="text-slate-400"> {{userObject.user?.role}} </p>
					<h2 class="text-gray-800 font-semibold mt-3"> Adres e-mail: </h2><p class="text-slate-800"> {{ userObject.user?.email }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Miasto: </h2><p class="text-slate-800"> {{ userObject.city }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Nr tel.: </h2><p class="text-slate-800"> {{ userObject.phone_number }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Data urodzenia: </h2> <p class="text-slate-800"> {{ new Date(userObject.date_of_birth).toDateString().substring(4) }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Ocena: </h2><p class="text-slate-800"> {{ userObject.rating }} </p>
          <h2 class="text-gray-800 font-semibold mt-3 text-center">O mnie:</h2><p class="text-slate-800"> {{ userObject.about_me || 'Brak opisu'}} </p>
        </div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {useAuthStore} from "@/stores/auth.module";

const authStore = useAuthStore();
export default {
	name: "CaregiverProfile",
  props: {
    userData: {
      type: Object as () => CaregiverProfile,
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
}
</script>

<style scoped>

</style>