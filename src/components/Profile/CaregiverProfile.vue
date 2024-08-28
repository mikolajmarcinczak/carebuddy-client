<template>
	<div class="flex flex-col items-center justify-center px-0 py-0 mx-auto md:mt-36 lg:py-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
		<div class="flex items-center justify-center">
			<div class="bg-white n-1/3 mt-10 rounded-lg">
				<div class="flex items-center justify-center flex-col">
					<img src="/src/assets/logo.jpg" alt="Logo CareBuddy">
					<h1 class="text-gray-800 mt-5"> Imię i nazwisko: {{userData.user?.username}} </h1>
					<h1 class="text-gray-400 p-4"> Rola: {{userData.user?.role}} </h1>
					<h1 class="text-gray-500 p-4 text-center"> O mnie: {{ userData.about_me || 'Brak opisu'}} </h1>
					<h1 class="text-gray-400 p-4"> e-mail: {{ userData.user?.email }} </h1>
					<h1 class="text-gray-400 p-4"> Miasto: {{ userData.city }} </h1>
					<h1 class="text-gray-400 p-4"> Nr tel.: {{ userData.phone_number }} </h1>
					<h1 class="text-gray-400 p-4"> Ocena: {{ userData.rating }} </h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {useAuthStore} from "@/stores/auth.module";
import {PropType} from "vue";

const authStore = useAuthStore();
export default {
	name: "CaregiverProfile",
	props: {
		userData: {
			type: Object as PropType<CaregiverProfile>,
			required: true
		}
	},
	computed: {
		currentUser() {
			return authStore.$state.user;
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