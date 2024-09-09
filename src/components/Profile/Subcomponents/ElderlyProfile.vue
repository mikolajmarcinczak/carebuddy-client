<template>
  <div class="flex flex-col items-center justify-center px-0 py-0 mx-auto md:mt-36 lg:py-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
    <div class="flex items-center justify-center">
      <div class="bg-white n-1/3 mt-10 rounded-lg">
        <div class="flex items-center justify-center flex-col">
          <ProfilePicture :initialImageUrl="userObject.user?.image_url || '/src/assets/logo.jpg'"/>
          <h1 class="text-gray-800 font-semibold mt-5"> Imię i nazwisko: </h1><p class="text-slate-800"> {{userObject.user?.username}} </p>
					<h2 class="text-gray-400 font-semibold mt-3"> Rola: </h2><p class="text-slate-400"> {{userObject.user?.role}} </p>
					<h2 class="text-gray-800 font-semibold mt-3"> Adres e-mail: </h2><p class="text-slate-800"> {{ userObject.user?.email }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Adres zamieszkania: </h2> <p class="text-slate-800"> {{ userObject.address }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Miasto: </h2> <p class="text-slate-800"> {{ userObject.city }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Nr tel.: </h2> <p class="text-slate-800"> {{ userObject.phone_number }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Nr awaryjny: </h2> <p class="text-slate-800"> {{ userObject.emergency_number }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Wzrost: </h2> <p class="text-slate-800"> {{ userObject.height }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Waga: </h2> <p class="text-slate-800"> {{ userObject.weight }} </p>
          <h2 class="text-gray-800 font-semibold mt-3"> Data urodzenia: </h2> <p class="text-slate-800"> {{ new Date(userObject.date_of_birth).toDateString().substring(4) }} </p>
          <h2 class="text-gray-800 font-semibold mt-3 text-center"> O mnie: </h2> <p class="text-slate-800"> {{ userObject.about_me || 'Brak opisu'}} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElderlyProfile } from "@/types/elderly-profile.model";
import {useAuthStore} from "@/stores/auth.module";
import ProfilePicture from "@/components/Profile/ProfileUI/ProfilePicture.vue";

const authStore = useAuthStore();

export default {
	name: 'ElderlyProfile',
  components: {
    ProfilePicture
  },
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