<script lang="ts">
import Calendar from '../components/Calendar/CalendarPage.vue'
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.module";
import {computed, onMounted} from "vue";
export default {
	components: {
		Calendar
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
  <section>
    <Calendar />
  </section>
</template>


<style>


</style>