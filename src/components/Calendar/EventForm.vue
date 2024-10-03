<template>

		<button @click="openModal" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4
						focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5
						py-2.5 text-center me-2 mb-2">Dodaj wydarzenie</button>

	<div>
			<div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">

				<div class="bg-gray-800 p-8 rounded-lg overflow-y-auto max-h-[80vh]">

					<div>
							<h2 class="text-lg font-bold mb-4 text-white">Dodaj wydarzenie</h2>

							<form @submit.prevent="submitForm" class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
								<input v-model="title" placeholder="Tytuł wydarzenia" required class="bg-white w-full p-2 border rounded" />
								<input v-model="location" placeholder="Lokalizacja" required class="bg-white w-full p-2 border rounded" />
								<input v-model="time" type="datetime-local" required class="bg-white w-full p-2 border rounded" />

                <div>
                  <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                  <textarea v-model="description" name="description" id="description" rows="3" placeholder="Opis wydarzenia"
                            class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                            focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                            dark:focus:border-blue-500"></textarea>
                </div>
								<div class="flex items-center">
									<label for="recurring" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Powtarzające się</label>
									<input v-model="isRecurring" id="recurring" type="checkbox" class="mr-2 ml-6 mb-2" />
								</div>

                <div>
                  <label for="search" class="block tet-sm font-medium dark:text-white">Wybierz użytkowników</label>
                  <MultiselectSearch :options="searchResults" v-model:selected-users="selectedUsers" />
                </div>

								<button type="submit"
                        class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                        focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
                        rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">Zapisz</button>
							</form>

					</div>

						<!-- Button to close the modal -->
					<div class="flex justify-end mt-6">
							<button @click="closeModal"
                      class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                      focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
                      rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 ">
								Anuluj
							</button>
					</div>
				</div>
			</div>
	</div>
</template>

<script lang="ts">
import {useUserDataStore} from "@/stores/user-data.module";
import {getCurrentInstance, onMounted, ref} from "vue";
import {User} from "@/types/user.model";
import MultiselectSearch from "@/components/Search/MultiselectSearch.vue";

export default {
	name: "EventForm",
  components: {MultiselectSearch},
	data() {
		return {
			title: "",
			time: "",
      location: "",
      description: "",
			showForm: false,
			isRecurring: false,
			modalOpen: false
		}
	},
	emits: ['add-event'],
  setup(_, { emit }) {
    const userDataStore = useUserDataStore();
    const searchQuery = ref('');

    const user_ids = ref<string[]>([]);
    const searchResults = ref<User[]>([]);
    const selectedUsers = ref<User[]>([]);

    const currentUser = userDataStore.getUserProfile;
    user_ids.value.push(currentUser?.user?.user_id as string);
    console.log(currentUser?.user?.user_id);

    const loadAllUsers = async () => {
      const allUsers = await userDataStore.getUsersByRole('0000') as User[];
      searchResults.value = allUsers;
    };

    onMounted(async () => {
      await loadAllUsers();
    });

    let instance = getCurrentInstance();

    const submitForm = () => {
      if (instance) {
        const data = instance.data;
        user_ids.value.push(...selectedUsers.value.map(user => user.user_id));
        emit('add-event', {
          user_ids: user_ids.value,
          title: data.title,
          time: data.time,
          location: data.location,
          description: data.description,
          recurring: data.isRecurring
        });
        data.title = "";
        data.time = "";
        data.location = "";
        data.description = "";
        user_ids.value = [];
        data.isRecurring = false;
        closeModal();
      }
    }

    const openModal = () => {
      if (instance)
      instance.data.modalOpen = true;
    }

    const closeModal = () => {
      if (instance)
      instance.data.modalOpen = false;
    }

    return {
      searchQuery,
      searchResults,
      selectedUsers,
      user_ids,
      openModal,
      closeModal,
      submitForm
    };
  }
}
</script>

<style scoped>

</style>