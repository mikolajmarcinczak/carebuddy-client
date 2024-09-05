<template>
	<div>
		<button @click="openModal" class="p-2 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
		                                  focus:ring-4 focus:outline-none focus:ring-green-200 text-white font-medium
		                                  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Dodaj wydarzenie</button>
			<div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">

				<div class="bg-gray-800 p-8 rounded-lg overflow-y-auto max-h-[80vh]">

					<div>
							<h2 class="text-lg font-bold mb-4 text-white">Dodaj wydarzenie</h2>

							<form @submit.prevent="submitForm" class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
								<input v-model="title" placeholder="Tytuł wydarzenia" required class="bg-white w-full p-2 border rounded" />
								<input v-model="location" placeholder="Lokalizacja" required class="bg-white w-full p-2 border rounded" />
								<input v-model="date" type="datetime-local" required class="bg-white w-full p-2 border rounded" />

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
								<button type="submit"
                        class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                        focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
                        rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">Zapisz</button>
                <div>
                  <input v-model="searchQuery" @input="searchUsers" placeholder="Search by email" />
                  <ul v-if="searchResults.length">
                    <li v-for="user in searchResults" :key="user.user_id" @click="addUser(user)">
                      {{ user.email }}
                    </li>
                  </ul>
                  <div>
                    <h3>Selected Users:</h3>
                    <ul>
                      <li v-for="user in selectedUsers" :key="user.user_id">
                        {{ user.email }}
                      </li>
                    </ul>
                  </div>
                  <!-- Other form fields -->
                </div>
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
import {ref} from "vue";
import {User} from "@/types/user.model";

export default {
	name: "EventForm",
	data() {
		return {
			title: "",
			date: "",
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

    const searchUsers = async () => {
      if (searchQuery.value.length > 2) {
        let users = await userDataStore.getUsersByRole('0000')  || [];
        console.log(users);
        searchResults.value = users.filter(user => user.email.includes(searchQuery.value));
      } else {
        searchResults.value = [];
      }
    };

    const addUser = (user: User) => {
      if (!user_ids.value.includes(user.user_id)) {
        user_ids.value.push(user.user_id);
        selectedUsers.value.push(user);
      }
    };

    return {
      searchQuery,
      searchResults,
      selectedUsers,
      user_ids,
      searchUsers,
      addUser
    };
  },
	methods: {
		openModal() {
			this.modalOpen = true;
		},
		closeModal() {
			this.modalOpen = false;
		},
		submitForm() {
			const formattedDate = new Date(this.date).toISOString();
			this.$emit('add-event', {
				user_ids: this.user_ids,
				title: this.title,
				date: formattedDate,
        location: this.location,
        description: this.description,
				recurring: this.isRecurring
			});
			this.title = "";
			this.date = "";
      this.location = "";
      this.description = "";
      this.user_ids = [];
			this.isRecurring = false;
			this.closeModal();
		}
	}
}
</script>

<style scoped>

</style>