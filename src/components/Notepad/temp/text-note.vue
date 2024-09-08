<template>
	<div class="container mx-auto p-4">
		<div class="bg-white p-6 rounded-lg shadow-lg">
			<div class="text-lg font-bold">
				{{ note.title }}
			</div>
			<div class="italic text-gray-600">
				{{ note.content }}
			</div>
			<div class="text-gray-500">
				{{ note.user_id + ', ' + note.related_user_ids }}
			</div>
			<div class="text-gray-500">
				{{ note.updated_at }}
			</div>
			<div class="flex justify-between mt-4">
        <span class="cursor-pointer text-blue-500" @click="showEdit">
          <i class="fas fa-edit"></i>
        </span>
				<span class="cursor-pointer text-red-500" @click="deleteNote">
          <i class="fas fa-trash"></i>
        </span>
			</div>
		</div>
		<div class="bg-white p-6 rounded-lg shadow-lg mt-4" v-show="showModelEdit">
			<div class="space-y-4">
				<div>
					<label for="title" class="block text-gray-700">Tytuł</label>
					<input type="text" id="title" v-model="noteTitle" class="w-full px-3 py-2 border rounded"/>
				</div>
				<div>
					<label for="content" class="block text-gray-700">Treść notatki</label>
					<textarea id="content" v-model="noteContent" class="w-full px-3 py-2 border rounded"></textarea>
				</div>
				<div>
					<label for="user_emails" class="block text-gray-700">Adresy email użytkowników</label>
					<multiselect-search id="user_emails"
							v-model="selectedUsers"
							:options="userOptions"
							@update:selected-users="handleSelectedUsers"
					></multiselect-search>
				</div>
				<div class="flex justify-end space-x-4">
					<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded" @click="saveEditedNote">Zapisz</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">

import {Note} from "@/types/note.model";
import {useNoteStore} from "@/stores/note.module";
import {onMounted, ref} from "vue";
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
	setup(props) {
		const userStore = useUserDataStore();
		const noteStore = useNoteStore();
		const showModelEdit = ref(false);

		const noteTitle = ref(props.note.title);
		const noteContent = ref(props.note.content);
		const selectedUsers = ref<User[]>([]);
		const userOptions = ref<User[]>([]);

		const showEdit = () => {
			showModelEdit.value = true;
		};

		const saveEditedNote = async () => {
			const updatedNote = new Note({
				...props.note,
				title: noteTitle.value,
				content: noteContent.value,
				related_user_ids: selectedUsers.value.map((user: any) => user.user_id)
			});

			await noteStore.updateNote(props.note.id, updatedNote);
			await sendNote();
			showModelEdit.value = false;
		};

		const deleteNote = async () => {
			await noteStore.deleteNote(props.note.id);
		};

		const handleSelectedUsers = (users: User[]) => {
      selectedUsers.value = users;
    };

		const addUser = (selected: User) => {
			if (!selectedUsers.value.includes(selected)) {
				selectedUsers.value.push(selected);
			}
		};

		const sendNote = async () => {
			const sendNoteParams = new SendNoteParameters({
				note_id: props.note.id,
				user_ids: selectedUsers.value.map(user => user.user_id)
			});

			await noteStore.sendNote(sendNoteParams);
		};

    onMounted(async () => {
      try {
        const allUsers = await userStore.getUsersByRole("0000") as User[];
        userOptions.value = allUsers;
        selectedUsers.value = allUsers.filter(user => props.note.related_user_ids.includes(user.user_id));
      } catch (error: any) {
        console.error(error);
      }
    });

		return {
			showModelEdit,
			noteTitle,
			noteContent,
			userOptions,
			selectedUsers,
			showEdit,
			saveEditedNote,
			deleteNote,
			handleSelectedUsers,
			addUser
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