<template>
  <div>
    <button @click="openModal" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
    																	focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800
    																	font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      Edytuj profil
    </button>

    <div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-gray-800 p-8 rounded-lg overflow-y-auto max-h-[80vh]">
        <div>
          <h2 class="text-xl text-center font-bold mb-4">Edytuj profil</h2>
          
          <form @submit.prevent="handleSubmit" class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                  <ProfilePicture :initialImageUrl="profileData.user?.image_url || '/src/assets/logo.jpg'" @update:imageUrl="updateImageUrl" />
              </div>
              <div>
                  <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imię i nazwisko</label>
                  <input v-model="username" type="text" name="username" id="username" @update:modelValue="updateUsername"
                         class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                         focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              </div>
              <div>
                  <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numer telefonu</label>
                  <input v-model="profileData.phone_number" type="tel" name="phone_number" id="phone_number"
                         class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                         focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
              <div>
                  <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Miasto</label>
                  <input v-model="profileData.city" type="text" name="city" id="city"
                         class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                         focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
              <div>
                  <label for="date_of_birth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data urodzenia</label>
                  <input v-model="profileData.date_of_birth" type="date" name="date_of_birth" id="date_of_birth"
                         class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                          focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
              <div v-if="userRole === 'elderly'" class="space-y-4">
                  <div>
                   <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adres zamieszkania</label>
                    <input v-model="(profileData as ElderlyProfile).address" type="text" name="address" id="address"
                           class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                           focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
                  <div>
                      <label for="height" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wzrost</label>
                      <input v-model="(profileData as ElderlyProfile).height" type="number" name="height" id="height"
                             class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                             focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
                  <div>
                      <label for="weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Waga</label>
                      <input v-model="(profileData as ElderlyProfile).weight" type="number" name="weight" id="weight"
                             class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                             focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
                  <div>
                      <label for="emergency_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Numer telefonu do kontaktu w nagłych wypadkach
                      </label>
                      <input v-model="(profileData as ElderlyProfile).emergency_number" type="tel" name="emergency_number"
                             id="emergency_number" class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
              </div>
              <div>
                  <label for="about_me" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opis użytkownika</label>
                  <textarea v-model="profileData.about_me" name="about_me" id="about_me" rows="3"
                            class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600
                            focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
              </div>
              <button type="submit"
                      class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4
                      focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5
                      text-center dark:bg-primary-600 dark:hover:bg-primary-700">Zapisz zmiany</button>
          </form>
        </div>

        <div class="flex justify-end mt-6">
          <button @click="closeModal" v-if="!disableClose"
                  class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4
                  focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5
                  text-center dark:bg-primary-600 dark:hover:bg-primary-700">
            Anuluj &times;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {useUserDataStore} from "@/stores/user-data.module";
import {useAuthStore} from "@/stores/auth.module";
import {computed, onMounted, ref} from "vue";
import {ElderlyProfile} from "@/types/elderly-profile.model";
import {CaregiverProfile} from "@/types/caregiver-profile.model";
import ProfilePicture from "@/components/Profile/ProfileUI/ProfilePicture.vue";

export default {
  components: {
    ProfilePicture
  },
  props: {
    disableClose: {
      type: Boolean,
      default: false
    },
    initialData: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  setup(props) {
    const userDataStore = useUserDataStore();
    const authStore = useAuthStore();
    const modalOpen = ref(false);
    const profileData = ref<ElderlyProfile | CaregiverProfile>(
        {
          phone_number: '',
          address: '',
          date_of_birth: '',
          city: '',
          height: 0,
          weight: 0,
          about_me: '',
          emergency_number: '',
          user: {
            user_id: '',
            username: '',
            password: '',
            role: '',
            email: '',
            image_url: ''
          }
        });

    const userRole = authStore.$state.user.role;

    onMounted(async () => {
      const userProfile = userDataStore.getUserProfile
      if (userProfile) {
        profileData.value = userProfile as ElderlyProfile | CaregiverProfile || props.initialData;
      } else {
        if (profileData.value.user) {
          profileData.value.user.username = authStore.$state.user.username;
          profileData.value.user.email = authStore.$state.user.email;
        }
      }
    })

    const username = computed({
      get: () => profileData.value.user?.username || '',
      set: (value: string) => {
        if (profileData.value.user) {
          profileData.value.user.username = value;
        }
      }
    });

    const handleSubmit = async () => {
      const userProfile = userDataStore.getUserProfile;
      console.log(profileData.value);
      if (userProfile) {
        await userDataStore.updateUserProfile(JSON.parse(JSON.stringify(profileData.value)));
      }
      else {
        console.log(JSON.parse(JSON.stringify(profileData.value)));
        await userDataStore.addUserProfile(JSON.parse(JSON.stringify(profileData.value)));
      }
      console.log(userDataStore.getUserProfile);
      modalOpen.value = false;
    }

    const updateUsername = (value: string) => {
      if (profileData.value.user) {
        profileData.value.user.username = value;
      }
    }

    const updateImageUrl = (imageUrl: string) => {
      if (profileData.value.user) {
        profileData.value.user.image_url = imageUrl;
      }
    }

    return {
      profileData,
      userRole,
      modalOpen,
      username,
      handleSubmit,
      updateUsername,
      updateImageUrl
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      if (!this.disableClose) {
        this.modalOpen = false;
      }
    },

  }
};
</script>

<style scoped>

</style>
