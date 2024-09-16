<template>
  <div>
    <CaregiverProfile v-if="caregiverProfile" :userData="caregiverProfile" />
    <ElderlyProfile v-else-if="elderlyProfile" :userData="elderlyProfile" />
    <div v-else class="mt-8 ml-16 text-primary-900">No profile data available</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { ElderlyProfile as ElderlyProfileType } from '@/types/elderly-profile.model';
import { CaregiverProfile as CaregiverProfileType } from '@/types/caregiver-profile.model';
import {useAuthStore} from "@/stores/auth.module";
import CaregiverProfile from "@/components/Profile/Subcomponents/CaregiverProfile.vue";
import ElderlyProfile from "@/components/Profile/Subcomponents/ElderlyProfile.vue";

export default defineComponent({
  name: 'Profile',
  props: {
    caregiverData: {
      type: Object as () => CaregiverProfileType,
      required: false,
      default: null
    },
    elderlyData: {
      type: Object as () => ElderlyProfileType,
      required: false,
      default: null
    }
  },
  components: {
    CaregiverProfile,
    ElderlyProfile
  },
  computed: {
    currentUser() {
      return this.authStore.$state.user;
    },
    caregiverProfile() {
      return this.caregiverData as CaregiverProfileType;
    },
    elderlyProfile() {
      return this.elderlyData as ElderlyProfileType;
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