<script lang="ts">
import NotesTool from '@/components/Notepad/NotesTool.vue'
import {computed, onMounted, ref} from "vue";
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
		const loading = ref(true);

    onMounted(async () => {
      try {
        if (currentUser.value === null || currentUser.value === undefined) {
          return router.push('/login');
        } else {
					loading.value = authStore.$state.loading;
				}
      } catch (error) {
				console.error(error);
			}
    })

		return {
			loading
		}
  }
}
</script>

<template>
  <section class="mt-24">
   <NotesTool />
  </section>
</template>


<style>


</style>