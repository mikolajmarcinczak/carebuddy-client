<template>
	<div class="grid grid-cols-1 md:grid-cols-1 gap-4 mt-24">
		<div v-if="currentUser">
			<div class="grid md:grid-cols-8 grid-rows-3">
				<div class="col-span-2"><EventForm class="w-full"/></div>
				<div class="col-span-2"><AddMedicalTreatment class="w-full"/></div>
				<div class="col-span-4"><CalendarButton class="w-full"/></div>
			</div>
			<div v-if="currentUser.role === 'elderly'" class="grid grid-cols-1 grid-rows-12">
				<div class="row-span-9"><ElderlyProfile :userData="currentUser" /></div>
				<div class="row-span-1"><AddAlarmButton /></div>
				<div class="row-span-1"><NotesTool /></div>
				<div class="row-span-1"><MedicamentsList /></div>
			</div>
			<div v-else-if="currentUser.role === 'caregiver'" class="grid grid-rows-10 grid-cols-2">
				<div class="col-span-2"><AddProtege /></div>
				<div class="row-span-4"><UserElderlyList /></div>
				<div class="row-span-4"><NextAlarmsList /></div>
				<div class="col-span-2"><NotesTool /></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.module';
import { useRouter } from 'vue-router';
import EventForm from '@/components/Calendar/EventForm.vue';
import AddMedicalTreatment from "@/components/MedicalTreatment/AddMedicalTreatment.vue";
import CalendarButton from '@/components/Profile/ProfileButtons/CalendarButton.vue';
import AddAlarmButton from '@/components/Dashboard/AddAlarmButton.vue';
import MedicamentsList from '@/components/MedicalTreatment/MedicamentsList.vue';
import ElderlyProfile from '@/components/Profile/Subcomponents/ElderlyProfile.vue';
import AddProtege from '@/components/Profile/ProfileButtons/AddProteges.vue';
import UserElderlyList from '@/components/Profile/Subcomponents/UserProtegesList.vue';
import NextAlarmsList from '@/components/Dashboard/NextAlarmsList.vue';
import NotesTool from "@/components/Notepad/NotesTool.vue";

export default defineComponent({
	name: 'HomeView',
	components: {
		NotesTool,
		EventForm,
		AddMedicalTreatment,
		CalendarButton,
		AddAlarmButton,
		MedicamentsList,
		ElderlyProfile,
		AddProtege,
		UserElderlyList,
		NextAlarmsList
	},
	setup() {
		const authStore = useAuthStore();
		const router = useRouter();
		const currentUser = authStore.$state.user;

		onMounted(() => {
			if (!currentUser) {
				router.push('/about');
			}
		});

		return {
			currentUser
		};
	}
});
</script>