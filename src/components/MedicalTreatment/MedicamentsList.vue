<template>
	<div class="flex flex-col items-center justify-center shadow-lg p-6 bg-gray-800 rounded-lg">
		<h2 class="text-xl font-bold mb-4">Przyjmowane leki: </h2>
		<ul class="space-y-4">
			<li v-if="medicaments.length === 0" class="text-center text-gray-400">
				Brak przyjmowanych leków.
			</li>
			<li v-for="medicament in medicaments" :key="medicament.id">
				<p class="text-lg font-medium">{{ medicament.name }}</p>
				<p>{{ medicament.active_substance }}</p>
				<p>{{ medicament.dosage }}</p>
				<p>{{ medicament.manufacturer }}</p>
			</li>
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