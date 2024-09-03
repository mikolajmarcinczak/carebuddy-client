<template>
  <div>
    <CaregiverProfile v-if="currentUser.role === 'caregiver' && caregiverData" :userData="caregiverData" />
    <ElderlyProfile v-else-if="elderlyData" :userData="elderlyData" />
    <div v-else class="mt-8 ml-16 text-primary-900">No profile data available</div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import {ElderlyProfile} from "@/types/elderly-profile.model";
import { ElderlyProfile as ElderlyProfileType } from '@/types/elderly-profile.model';
import { CaregiverProfile as CaregiverProfileType } from '@/types/caregiver-profile.model';
import {useAuthStore} from "@/stores/auth.module";

export default defineComponent({
  name: 'Profile',
  components: {
    CaregiverProfile,
    ElderlyProfile
  },
  props: {
    caregiverData: {
      type: Object as PropType<CaregiverProfileType | null>,
      default: null
    },
    elderlyData: {
      type: Object as PropType<ElderlyProfileType | null>,
      default: null
    }
  },
  computed: {
    currentUser() {
      return this.authStore.$state.user;
    }
  },
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    }
  }
});
</script>

<style scoped>
</style>