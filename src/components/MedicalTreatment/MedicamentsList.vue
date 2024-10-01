<template>
	<div>
		<h2 class="text-xl font-bold mb-4">Przyjmowane leki: </h2>
		<ul>
			<li v-for="medicament in medicaments" :key="medicament.id">{{ medicament.name }}</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useMedicalTreatmentStore } from '@/stores/medical-treatment.module';
import {useUserDataStore} from "@/stores/user-data.module";
import {Medicament} from "@/types/medicament.model";

export default {
	name: 'MedicamentsList',
	setup() {
		const medicalTreatmentStore = useMedicalTreatmentStore();
		const userDataStore = useUserDataStore();
		const medicaments = ref<Medicament[]>([]);
		let userMedicaments: Medicament[] = [];

		onMounted(async () => {
			const userId = userDataStore.getUserProfile?.user?.user_id;
			if (userId) {
				await medicalTreatmentStore.getMedicamentsForUser(userId);
				userMedicaments = medicalTreatmentStore.getMedicaments;
				medicaments.value = userMedicaments;
			}
		});

		return {
			medicaments
		};
	}
};
</script>