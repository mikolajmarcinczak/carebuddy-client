<template>
	<div>
		<div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
			<div class="bg-gray-800 p-8 rounded-lg overflow-y-auto max-h-[80vh]">
				<h2 class="text-lg font-bold mb-4 text-white">Edytuj wydarzenie</h2>
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
import {onMounted, ref, watch} from "vue";
import {User} from "@/types/user.model";
import {CalendarEvent} from "@/types/event.model";
import MultiselectSearch from "@/components/Search/MultiselectSearch.vue";
import {useUserDataStore} from "@/stores/user-data.module";

export default {
	name: "EditEventForm",
	components: { MultiselectSearch },
	props: {
		event: {
			type: Object as () => CalendarEvent,
			required: true
		},
		modalOpen: {
			type: Boolean,
			required: true
		}
	},
	emits: ['update-event', 'close-modal'],
	setup(props, { emit }) {
		const title = ref(props.event.title);
		const time = ref(props.event.time);
		const location = ref(props.event.location);
		const description = ref(props.event.description);
		const isRecurring = ref(props.event.recurring);
		const searchResults = ref<User[]>([]);
		const selectedUsers = ref<User[]>([]);
		const userDataStore = useUserDataStore();
		const modalOpen = ref(props.modalOpen);

		const openModal = () => {
			modalOpen.value = true;
		};

		const closeModal = () => {
			modalOpen.value = false;
			emit('close-modal');
		};

		const submitForm = () => {
			const updatedEvent = {
				...props.event,
				title: title.value,
				time: time.value,
				location: location.value,
				description: description.value,
				recurring: isRecurring.value,
				user_ids: selectedUsers.value.map(user => user.user_id)
			};
			emit('update-event', updatedEvent);
			closeModal();
		};

		onMounted(async () => {
			const allUsers = await userDataStore.getUsersByRole('0000') as User[];
			searchResults.value = allUsers;
			selectedUsers.value = allUsers.filter(user => props.event.user_ids.includes(user.user_id));
		});

		watch(() => props.event, (newEvent) => {
			title.value = newEvent.title;
			time.value = newEvent.time;
			location.value = newEvent.location;
			description.value = newEvent.description;
			isRecurring.value = newEvent.recurring;
			selectedUsers.value = searchResults.value.filter(user => newEvent.user_ids.includes(user.user_id));
		});

		return {
			title,
			time,
			location,
			description,
			isRecurring,
			searchResults,
			selectedUsers,
			openModal,
			closeModal,
			submitForm
		};
	}
}
</script>

<style scoped>

</style>