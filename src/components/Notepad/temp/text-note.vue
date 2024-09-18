<template>
	<div class="container mx-auto p-4">
		<div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg mt-4">
      <div>
        <div class="text-lg font-bold">
          {{ computedNote.title }}
        </div>
        <div class="text-gray-500">
          <span class="font-bold"> Modyfikowano: </span> {{ new Date(String(computedNote.updated_at)).toDateString() }}
        </div>
      </div>
      <div class="text-gray-500">
        <ul>
          <li><b>Autor:</b> {{ username }}</li>
					<p> <b>Powiązani użytkownicy: </b>
          	<span v-for="user in usernames" :key="user">{{ user }}, </span>
					</p>
        </ul>
      </div>
      <div class="italic text-gray-300">
				{{ computedNote.content }}
      </div>

			<div class="flex justify-between mt-4">
        <span class="cursor-pointer text-blue-500" @click="showEdit">
          <i class="fas fa-edit"></i>Edytuj
        </span>
				<span class="cursor-pointer text-red-500" @click="deleteNote(note.id)">
          <i class="fas fa-trash-o"></i> Usuń
        </span>
			</div>
		</div>
		<div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg mt-4" v-show="showModelEdit">
			<div class="space-y-4">
				<div>
					<label for="title" class="text-lg font-bold">Tytuł</label>
					<input type="text" id="title" v-model="noteTitle" class="bg-white text-gray-900 w-full p-2 border rounded"/>
				</div>
				<div>
					<label for="content" class="block text-gray-300">Treść notatki</label>
					<textarea id="content" v-model="noteContent" class="bg-white text-gray-900 w-full p-2 border rounded"></textarea>
				</div>
				<div>
					<label for="user_emails" class="block text-gray-300">Oznacz użytkowników</label>
					<multiselect-search id="user_emails"
							v-model:selected-users="selectedUsers"
							:options="userOptions"
							@update:selected-users="handleSelectedUsers"
					></multiselect-search>
				</div>
				<div class="flex justify-end space-x-4">
					<button class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600
                  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200
                  dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
                  dark:hover:bg-primary-700" @click="saveEditedNote">Zapisz</button>
					<button class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600
                  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200
                  dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600
                  dark:hover:bg-primary-700" @click="closeEdit">Anuluj</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">

import {Note} from "@/types/note.model";
import {computed, onMounted, ref, watch} from "vue";
import {useUserDataStore} from "@/stores/user-data.module";
import {SendNoteParameters} from "@/types/send-note.parameters.model";
import {User} from "@/types/user.model";
import MultiselectSearch from "@/components/Search/MultiselectSearch.vue";

export default {
	name: "text-note",
  components: {
    MultiselectSearch
  },
	props: {
		note: {
			type: Object as () => Note,
			required: true
		}
	},
	setup(props, { emit }) {
		const userStore = useUserDataStore();
		const showModelEdit = ref(false);

		const computedNote = computed(() => props.note);

		const noteTitle = ref(computedNote.value.title);
		const noteContent = ref(computedNote.value.content);
		const relatedUserIds = ref(computedNote.value.related_user_ids.filter(uniqueFilter));

		const selectedUsers = ref<User[]>([]);
		const userOptions = ref<User[]>([]);

		const username = ref('');
		const usernames = ref<string[]>([]);

		const showEdit = () => {
			showModelEdit.value = true;
		};

		const closeEdit = () => {
			showModelEdit.value = false;
		};

		const populateDefaultValues = async () => {
			noteTitle.value = computedNote.value.title;
			noteContent.value = computedNote.value.content;
			const allUsers = await userStore.getUsersByRole("0000") as User[];
			userOptions.value = allUsers;
			const users = await Promise.all(
					relatedUserIds.value.map(id => userStore.getSimpleUserById(id))
			) as User[];
			selectedUsers.value = users;
		};

		watch(() => computedNote.value, populateDefaultValues);

		const fetchUsernames = async () => {
			if (computedNote.value.user_id) {
				const user = await userStore.getSimpleUserById(computedNote.value.user_id);
				username.value = user?.username || 'Unknown';
			}

			if (relatedUserIds.value.length > 0) {
				const users = await Promise.all(
						relatedUserIds.value.map(id => userStore.getSimpleUserById(id))
				);
				usernames.value = users.map(user => user?.username || 'Unknown');
			}
		};

		watch(() => computedNote.value, fetchUsernames);

		function uniqueFilter(value: any, index: any, self: any) {
			return self.indexOf(value) === index;
		}

		const saveEditedNote = async () => {
			const ids = selectedUsers.value.map(user => user.user_id);

			const updatedNote = new Note({
				...props.note,
				title: noteTitle.value,
				content: noteContent.value,
				related_user_ids: ids
			});
			console.log(updatedNote);

			emit("saveEditedNote", props.note.id, updatedNote);
			await sendNote();
			showModelEdit.value = false;
		};

		const deleteNote = async (noteId: string) => {
			emit("deleteNote", noteId);
		};

		const handleSelectedUsers = (users: User[]) => {
			selectedUsers.value = users;
		};

		const sendNote = async () => {
			const sendNoteParams = new SendNoteParameters({
				note_id: props.note.id,
				user_ids: selectedUsers.value.map(user => user.user_id)
			});

			emit("sendNote", sendNoteParams);
		};

    onMounted(async () => {
      try {
				await populateDefaultValues();
				await fetchUsernames();
      } catch (error: any) {
        console.error(error);
      }
    });

		return {
			showModelEdit,
			noteTitle,
			noteContent,
			computedNote,
			userOptions,
			selectedUsers,
			username,
			usernames,
			showEdit,
			closeEdit,
			saveEditedNote,
			deleteNote,
			handleSelectedUsers
		};
	}
}
</script>

<style scoped>
@import "vue-select/dist/vue-select.css";

.italic {
	font-style: italic;
}
</style>