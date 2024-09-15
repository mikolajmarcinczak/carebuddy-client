<template>
  <div>
    <button @click="openModal"
						class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
						focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
						rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      Dodaj podopiecznego
    </button>

    <!-- Modal -->
    <div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-gray-800 p-8 rounded-lg overflow-y-auto max-h-[80vh]">
        <div>
          <h2 class="text-lg font-bold mb-4">Dodaj podopiecznego</h2>
        </div>
        <div>
          <label for="search"
								 class="block mb-2 font-medium text-gray-900 dark:text-white">
						Adres e-mail podopiecznego
					</label>
         <SingleselectSearch :options="allUsers" v-model:selected-user="selectedUser"/>
        </div>
        <div>
          <label for="documentUrl" class="block mb-2 font-medium text-gray-900 dark:text-white mt-5">
            URL dokumentu potwierdzającego opiekę
          </label>
          <input v-model="documentUrl" type="url" name="documentUrl" id="documentUrl"
                 class="bg-white border border-gray-300 text-white sm:text-l rounded-lg
            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
            dark:focus:border-blue-500" placeholder="https://example.com/document.pdf" required>
        </div>
        <div class="flex justify-end mt-6">
          <button @click="addUser"
									class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
									focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
									rounded-lg text-sm px-5 py-2.5 text-center m-2 dark:bg-primary-600 dark:hover:bg-primary-700">
            Dodaj podopiecznego
          </button>
          <button @click="closeModal"
									class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
									focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
									rounded-lg text-sm px-5 py-2.5 text-center mt-2 m-2 dark:bg-primary-600 dark:hover:bg-primary-700">
            Zamknij
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {useUserDataStore} from "@/stores/user-data.module";
import {onMounted, ref} from "vue";
import SingleselectSearch from "@/components/Search/SingleselectSearch.vue";
import {User} from "@/types/user.model";

export default {
  components: {SingleselectSearch},
  setup() {
    const userDataStore = useUserDataStore();
    const modalOpen = ref(false);
    const documentUrl = ref('');

    const allUsers = ref<User[]>([]);
    const selectedUser = ref<User | null>(null);

    const openModal = () => {
      modalOpen.value = true;
    };

    const closeModal = () => {
      modalOpen.value = false;
    };

    const loadAllUsers = async () => {
      try {
        const users = await userDataStore.getUsersByRole("elderly") as User[];
        allUsers.value = users;
      } catch (error) {
        console.error(error);
      }
    };

    const addUser = async () => {
      try {
        if (selectedUser.value) {
          const elderlyId = selectedUser.value.user_id;
          await userDataStore.assignCare(elderlyId, documentUrl.value);
        }
      } catch (error) {
        console.error(error);
      } finally {
        closeModal();
      }
    }

    onMounted(async () => {
      await loadAllUsers();
    });

    return {
      modalOpen,
      documentUrl,
      allUsers,
      selectedUser,
      openModal,
      closeModal,
      addUser,
    }
  }
};
</script>

<style>
/* Dostosuj stylizację modala według potrzeb */
</style>
