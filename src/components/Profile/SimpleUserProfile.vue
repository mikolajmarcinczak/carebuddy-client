<template>
	<div class="flex justify-between items-center p-4 mb-2 bg-gray-700 rounded-lg shadow-sm">
		<div>
			<img :src="userData.user?.image_url" alt="User Image" class="w-12 h-12 rounded-full mr-4">
			<div class="text-lg font-medium">{{ userData.user?.username }}</div>
			<div class="text-sm text-gray-500">{{ userData.user?.email }}</div>
			<div class="text-sm text-gray-500">{{ userData.city }}</div>
		</div>
		<button @click="viewProfile((userData.user as User)?.user_id)"
						class="w-1/3 text-white bg-gradient-to-br from-green-400 to-blue-600
                  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200
                  dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
                  dark:hover:bg-primary-700">
			Pokaż profil
		</button>
	</div>
</template>

<script lang="ts">
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {User} from "@/types/user.model";
import ProfilePicture from "@/components/Profile/ProfileUI/ProfilePicture.vue";

export default {
	name: "SimpleUserProfile",
	components: {ProfilePicture},
	computed: {
		User() {
			return User
		}
	},
	props: {
		userData: {
			type: Object as () => ElderlyProfile | CaregiverProfile,
			required: true
		}
	},
	methods: {
		viewProfile(userId: string) {
			this.$router.push(`/profile/${userId}`);
		}
	}
}
</script>

<style scoped>

</style>