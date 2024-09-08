<template>
	<div class="container mx-auto p-4">
		<button @click="openModal" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600
						        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200
						        dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
						        dark:hover:bg-primary-700">
			<i class="fas fa-plus"></i>
		</button>
		<div v-if="modalOpen" class="inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
			<div class="bg-white p-8 rounded-lg overflow-y-auto max-h-[80vh]">
				<div>
					<h2 class="text-lg font-bold mb-4">Dodaj notatkę</h2>
					<form @submit.prevent="sendDataModel" class="space-y-4 max-w-md mx-auto mt-4 p-4 border rounded shadow-md">
						<div>
							<label for="title" class="block text-gray-700">Tytuł</label>
							<input type="text" id="title" v-model="titleText"
                     class="w-full px-3 py-2 border rounded" required />
						</div>
						<div>
							<label for="content" class="block text-gray-700">Treść notatki</label>
							<textarea id="content" v-model="contentText"
                        class="w-full px-3 py-2 border rounded" required></textarea>
						</div>
            <div>
              <label for="user_emails" class="block text-gray-700">Adresy email użytkowników</label>
              <multiselect-search id="user_emails"
                                  v-model="selectedUsers"
                                  :options="userOptions"
                                  @update:selected-users="handleSelectedUsers"
              ></multiselect-search>
            </div>
						<button type="submit"
                    class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600
						        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200
						        dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
						        dark:hover:bg-primary-700"
            > Zapisz
            </button>
					</form>
					<div class="flex justify-end mt-6">
						<button @click="closeModal"
                    class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600
						        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200
						        dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
						        dark:hover:bg-primary-700"
            >Anuluj
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import MultiselectSearch from "@/components/Search/MultiselectSearch.vue";
import {onMounted, ref} from "vue";
import {Note} from "@/types/note.model";
import {User} from "@/types/user.model";
import {useNoteStore} from "@/stores/note.module";
import {useUserDataStore} from "@/stores/user-data.module";
import {useAuthStore} from "@/stores/auth.module";

export default {
	name: "create-notes",
  components: {
    MultiselectSearch
  },
	setup() {
		const titleText = ref("");
		const contentText = ref("");
		const modalOpen = ref(false);
		const noteStore = useNoteStore();
    const userDataStore = useUserDataStore();
    const authStore = useAuthStore();
    const selectedUsers = ref<User[]>([]);
    const userOptions = ref<User[]>([]);

		const openModal = () => {
			modalOpen.value = true;
		};

		const closeModal = () => {
			modalOpen.value = false;
		};

    const handleSelectedUsers = (users: User[]) => {
      selectedUsers.value = users;
    };

		const sendDataModel = async () => {
			if (titleText.value.length > 0 && contentText.value.length > 0) {
				const newNote = new Note({
					id: String(),
					user_id: authStore.$state.user.user_id,
					related_user_ids: selectedUsers.value.map(user => user.user_id),
					related_urls: [],
					title: titleText.value,
					content: contentText.value,
          updated_at: new Date().toISOString(),
				});

				await noteStore.createNote(newNote);

				titleText.value = "";
				contentText.value = "";
				closeModal();
			}
		};

    onMounted(async () => {
      try {
        const allUsers = await userDataStore.getUsersByRole('0000') as User[];
        userOptions.value = allUsers;
      } catch (error: any) {
        console.error(error);
      }
    });

		return {
			titleText,
			contentText,
			modalOpen,
      selectedUsers,
      userOptions,
			openModal,
			closeModal,
			sendDataModel,
      handleSelectedUsers
		};
	}
}
</script>

<style scoped>

</style>