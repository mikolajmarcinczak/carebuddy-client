<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<EventForm />
		<AddMedicalTreatment />
		<CalendarButton />
		<div v-if="currentUser">
			<div v-if="currentUser.role === 'elderly'">
				<AddAlarmButton />
				<NotesList />
				<MedicamentsList />
				<ElderlyProfile :userData="currentUser" />
			</div>
			<div v-else-if="currentUser.role === 'caregiver'">
				<AddProtege />
				<UserElderlyList />
				<NextAlarmsList />
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
import NotesList from '@/components/Notepad/temp/notes-list.vue';
import MedicamentsList from '@/components/MedicalTreatment/MedicamentsList.vue';
import ElderlyProfile from '@/components/Profile/Subcomponents/ElderlyProfile.vue';
import AddProtege from '@/components/Profile/ProfileButtons/AddProteges.vue';
import UserElderlyList from '@/components/Profile/Subcomponents/UserProtegesList.vue';
import NextAlarmsList from '@/components/Dashboard/NextAlarmsList.vue';

export default defineComponent({
	name: 'HomeView',
	components: {
		EventForm,
		AddMedicalTreatment,
		CalendarButton,
		AddAlarmButton,
		NotesList,
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