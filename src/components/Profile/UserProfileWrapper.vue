<template>
	<component :is="activeTab"></component>
</template>

<script lang="ts">
import CaregiverProfile from './Subcomponents/CaregiverProfile.vue';
import ElderlyProfile from './Subcomponents/ElderlyProfile.vue';

export default {
	name: "UserProfileWrapper",
	components: {
		ElderlyProfile,
		CaregiverProfile
	},
	data() {
		return {
			activeTab: 'elderly-profile'
		}
	},
	methods: {
		switchTab(tab: any) {
			this.activeTab = tab
		}
	}
}
</script>

<style scoped>

</style>