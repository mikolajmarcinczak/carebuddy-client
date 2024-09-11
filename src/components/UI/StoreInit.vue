<script setup lang="ts">
import {useAuthStore} from "@/stores/auth.module";
import {useUserDataStore} from "@/stores/user-data.module";

const authStore = useAuthStore();

await authStore.initStore().then(async () => {
  const userDataStore = useUserDataStore();
  await userDataStore.initStore();
});
</script>

<template>

</template>

<style scoped>

</style>