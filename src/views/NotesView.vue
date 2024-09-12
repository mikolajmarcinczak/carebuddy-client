<script lang="ts">
import NotesTool from '@/components/Notepad/NotesTool.vue'
import {computed, onMounted} from "vue";
import {useAuthStore} from "@/stores/auth.module";
import {useRouter} from "vue-router";
export default {
	components: {
		NotesTool
	},
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const currentUser = computed(() => authStore.$state.user || null);

    onMounted(async () => {
      try {
        if (currentUser.value === null || currentUser.value === undefined) {
          return router.push('/login');
        }
      } catch (error) {
        console.error(error);
      }
    })
  }
}
</script>

<template>
  <main>
   <NotesTool />
  </main>
</template>


<style>


</style>