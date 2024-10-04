<template xmlns="http://www.w3.org/1999/html">
	<div class="bg-gray-800 flex flex-col items-center justify-center px-4 py-4 mx-auto md:mt-36 lg:py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg mb-6">
		<div class="flex items-center justify-center">
			<div class="n-1/3 mt-10 rounded-lg">
				<div class="flex items-center justify-center flex-col">
          <!--<ProfilePicture :initialImageUrl="userObject.user?.image_url || '/src/assets/logo.jpg'" @update:imageUrl="updateImageUrl"/>-->
					<h1 class="text-gray-200 font-semibold mt-5"> Imię i nazwisko: </h1><p class="text-slate-200"> {{userObject.user?.username}} </p>
					<h2 class="text-gray-400 font-semibold mt-3"> Rola: </h2><p class="text-slate-400"> {{userObject.user?.role}} </p>
					<h2 class="text-gray-200 font-semibold mt-3"> Adres e-mail: </h2><p class="text-slate-200"> {{ userObject.user?.email }} </p>
          <h2 class="text-gray-200 font-semibold mt-3"> Miasto: </h2><p class="text-slate-200"> {{ userObject.city }} </p>
          <h2 class="text-gray-200 font-semibold mt-3"> Nr tel.: </h2><p class="text-slate-200"> {{ userObject.phone_number }} </p>
          <h2 class="text-gray-200 font-semibold mt-3"> Data urodzenia: </h2> <p class="text-slate-200"> {{ new Date(userObject.date_of_birth).toDateString().substring(4) }} </p>
          <h2 class="text-gray-200 font-semibold mt-3"> Ocena: </h2><p class="text-slate-200"> {{ userObject.rating }} </p>
          <h2 class="text-gray-200 font-semibold mt-3 text-center">O mnie:</h2><p class="text-slate-200"> {{ userObject.about_me || 'Brak opisu'}} </p>
        </div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {useAuthStore} from "@/stores/auth.module";
import ProfilePicture from "@/components/Profile/ProfileUI/ProfilePicture.vue";

export default {
	name: "CaregiverProfile",
  components: {
    ProfilePicture
  },
  props: {
    userData: {
      type: Object as () => CaregiverProfile,
      required: true,
      default: null
    }
  },
	computed: {
		currentUser() {
			return this.authStore.$state.user;
		},
    userObject() {
      return this.userData;
    }
	},
	setup() {
		const authStore = useAuthStore();

		return {
			authStore
		}
	},
  methods: {
    async updateImageUrl(newImageUrl: string) {
      if (this.userObject.user) {
        this.userObject.user.image_url = newImageUrl;
      }
      await this.authStore.fetchUser();
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