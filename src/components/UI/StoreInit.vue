<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.module";
import {useUserDataStore} from "@/stores/user-data.module";
import {useNoteStore} from "@/stores/note.module";
import {useMedicamentStore} from "@/stores/medicament.module";
import {useMedicalTreatmentStore} from "@/stores/medical-treatment.module";

const authStore = useAuthStore();

await authStore.initStore().then(async () => {
  const userDataStore = useUserDataStore();
  const noteStore = useNoteStore();
  const medicamentStore = useMedicamentStore();
  const medicalTreatmentStore = useMedicalTreatmentStore();

  await userDataStore.initStore();
  await noteStore.initStore();
  await medicamentStore.initStore();
  await medicalTreatmentStore.initStore();
});
</script>

<template>

</template>

<style scoped>

</style>