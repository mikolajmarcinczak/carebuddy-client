<template>

    <button @click="openModal"
            class="p-2 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
    				focus:ring-4 focus:outline-none focus:ring-green-200 text-white font-medium
    				rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      Dodaj leki
    </button>

    <!-- Modal -->
	<div v-if="!loading">
    <div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-gray-800 p-8 rounded-lg overflow-y-auto max-h-[80vh]">
        <div v-if="step === 1">
          <h2 class="text-lg font-bold mb-4">Dodaj lek</h2>
          <form @submit.prevent="addMedicament">
            <div>
              <label for="name" class="block mb-2 font-medium text-gray-900 dark:text-white">Nazwa leku</label>
              <input v-model="medicament.name" type="text" id="name" class="bg-white border border-gray-300 text-white sm:text-l rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500" required>

							<label for="active_substance" class="block mb-2 font-medium text-gray-900 dark:text-white">Substancja aktywna</label>
							<input v-model="medicament.active_substance" type="text" id="active_substance" class="bg-white border border-gray-300 text-white sm:text-l rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500" required>

							<label for="dosage" class="block mb-2 font-medium text-gray-900 dark:text-white">Dawkowanie (mg)</label>
							<input v-model="medicament.dosage" type="text" id="dosage" class="bg-white border border-gray-300 text-white sm:text-l rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500" required>

							<label for="manufacturer" class="block mb-2 font-medium text-gray-900 dark:text-white">Producent</label>
							<input v-model="medicament.manufacturer" type="text" id="manufacturer" class="bg-white border border-gray-300 text-white sm:text-l rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500">

							<label for="composition" class="block mb-2 font-medium text-gray-900 dark:text-white">Skład</label>
							<input v-model="medicament.composition" type="text" id="composition" class="bg-white border border-gray-300 text-white sm:text-l rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500">

							<label for="indications" class="block mb-2 font-medium text-gray-900 dark:text-white">Wskazania</label>
							<input v-model="medicament.indications" type="text" id="indications" class="bg-white border border-gray-300 text-white sm:text-l rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500">

							<label for="contraindications" class="block mb-2 font-medium text-gray-900 dark:text-white">Przeciwwskazania</label>
							<input v-model="medicament.contraindications" type="text" id="contraindications" class="bg-white border border-gray-300 text-white sm:text-l rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500">
            </div>
            <div class="flex justify-end mt-6">
              <button type="button" @click="addMedicament"
                      class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                      focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
                      rounded-lg text-sm px-5 py-2.5 text-center m-2 dark:bg-primary-600 dark:hover:bg-primary-700">
                Dodaj lek
              </button>
              <button type="button" @click="nextStep"
                      class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                      focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
                      rounded-lg text-sm px-5 py-2.5 text-center m-2 dark:bg-primary-600 dark:hover:bg-primary-700">
                Dalej
              </button>
              <button type="button" @click="closeModal"
                      class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                      focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
                      rounded-lg text-sm px-5 py-2.5 text-center m-2 dark:bg-primary-600 dark:hover:bg-primary-700">
                Anuluj
              </button>
            </div>
          </form>
        </div>
        <div v-else-if="step === 2">
          <h2 class="text-lg font-bold mb-4">Dodaj leczenie</h2>
          <form @submit.prevent="saveTreatment">
            <div>
              <label for="diagnosis" class="block mb-2 font-medium text-gray-900 dark:text-white">Diagnoza</label>
              <input v-model="medicalTreatment.diagnosis" type="text" id="diagnosis" class="bg-white border border-gray-300 text-white sm:text-l rounded-lg
              focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500" required>
            </div>
            <div>
              <label for="medicaments" class="block mb-2 font-medium text-gray-900 dark:text-white">Leki</label>
              <MultiselectSearch :options="medicaments" v-model:selected-users="selectedMedicaments"/>
            </div>
            <div class="flex justify-end mt-6">
              <button type="submit"
                      class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                      focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
                      rounded-lg text-sm px-5 py-2.5 text-center m-2 dark:bg-primary-600 dark:hover:bg-primary-700">
                Zapisz
              </button>
              <button type="button" @click="closeModal"
                      class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                      focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
                      rounded-lg text-sm px-5 py-2.5 text-center m-2 dark:bg-primary-600 dark:hover:bg-primary-700">
                Anuluj
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import MultiselectSearch from "@/components/Search/MultiselectSearch.vue";
import {onMounted, ref} from "vue";
import {Medicament} from "@/types/medicament.model";
import {MedicalTreatment} from "@/types/medical-treatment.model";
import {useMedicalTreatmentStore} from "@/stores/medical-treatment.module";
import {useMedicamentStore} from "@/stores/medicament.module";

export default {
  name: "AddMedicalTreatment",
  components: {
    MultiselectSearch
  },
  setup() {
    const medicalTreatmentStore = useMedicalTreatmentStore();
    const medicamentStore = useMedicamentStore();

    const modalOpen = ref(false);
		const loading = ref(true);
    const step = ref(1);
    const medicament = ref<Medicament>({
      id: String(),
      name: '',
      dosage: '',
      manufacturer: '',
      active_substance: '',
      composition: '',
      contraindications: '',
      indications: '',
    });
    const medicalTreatment = ref<MedicalTreatment>({
      id: String(),
      user_id: '',
      medicament_ids: [],
      diagnosis: '',
      diagnosis_date: '',
      treatment_plan: '',
      certificate_url: '',
      prescription_url: '',
    });
    const medicaments = ref<Medicament[]>([]);
    const selectedMedicaments = ref<Medicament[]>([]);

    const openModal = () => {
      modalOpen.value = true;
    }

    const closeModal = () => {
      modalOpen.value = false;
      step.value = 1;
    }

    const nextStep = () => {
      step.value = 2;
    }

    const addMedicament = async () => {
      try {
        await medicamentStore.addMedicament(medicament.value);
        medicament.value = {
          id: String(),
          name: '',
          dosage: '',
          manufacturer: '',
          active_substance: '',
          composition: '',
          contraindications: '',
          indications: '',
        };
				await loadAllMedicaments();
      } catch (error) {
        console.error(error);
      }
    }

    const saveTreatment = async () => {
      try {
        medicalTreatment.value.medicament_ids = selectedMedicaments.value.map(medicament => medicament.id);
        await medicalTreatmentStore.addMedicalTreatment(medicalTreatment.value);
        medicalTreatment.value = {
          id: String(),
          user_id: '',
          medicament_ids: [],
          diagnosis: '',
          diagnosis_date: '',
          treatment_plan: '',
          certificate_url: '',
          prescription_url: '',
        };
        selectedMedicaments.value = [];
        closeModal();
      } catch (error) {
        console.error(error);
      }
    }

    const loadAllMedicaments = async () => {
      try {
				await medicamentStore.getAllMedicaments();
        medicaments.value = medicamentStore.getMedicaments;
      } catch (error) {
        console.error(error);
      }
    }

    onMounted(async () => {
      await loadAllMedicaments();
			do {
				loading.value = !medicamentStore.$state.loading && !medicalTreatmentStore.$state.loading;
			} while (loading.value);
    })

    return {
      modalOpen,
			loading,
      step,
      medicament,
      medicalTreatment,
      medicaments,
      selectedMedicaments,
      openModal,
      closeModal,
      nextStep,
      addMedicament,
      saveTreatment
    }
  }
}
</script>

<style scoped>

</style>