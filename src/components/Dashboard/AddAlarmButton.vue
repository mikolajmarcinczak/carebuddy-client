<template>
	<button @click="openModal" class="p-2 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
    focus:ring-4 focus:outline-none focus:ring-green-200 text-white font-medium
    rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Dodaj alarm o lekach</button>

	<div>
		<div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
			<div class="bg-gray-800 p-8 rounded-lg overflow-y-auto max-h-[80vh]">
				<h2 class="text-lg font-bold mb-4 text-white">Dodaj alarm</h2>
				<form @submit.prevent="saveAlarm" class="mt-4 space-y-4 lg:mt-5 md:space-y-5">
					<input v-model="title" placeholder="Tytuł alarmu" required class="bg-white font-gray-800 w-full p-2 border rounded" />
					<input v-model="content" placeholder="Treść alarmu" required class="bg-white font-gray-800 w-full p-2 border rounded" />
					<input v-model="time" type="datetime-local" required class="bg-white font-gray-800 w-full p-2 border rounded" />
					<div class="flex justify-end mt-6">
						<button type="submit" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
              focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
              rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">Zapisz</button>
						<button type="button" @click="closeModal" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
              focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
              rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">Anuluj</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import {useEventStore} from "@/stores/event.module";
import {CalendarEvent} from "@/types/event.model";
import {Alarm} from "@/types/alarm.model";
import {useUserDataStore} from "@/stores/user-data.module";

export default {
	name: 'AddAlarmButton',
	setup() {
		const eventStore = useEventStore();
		const userDataStore = useUserDataStore();

		const modalOpen = ref(false);
		const title = ref('');
		const content = ref('');
		const time = ref('');


		const openModal = () => {
			modalOpen.value = true;
		}

		const closeModal = () => {
			modalOpen.value = false;
			title.value = '';
			content.value = '';
			time.value = '';
		};

		const addAlarm = async () => {
			try {
				const eventData: CalendarEvent = {
					id: String(),
					user_ids: [],
					title: title.value,
					description: content.value,
					recurring: false,
					location: '',
					time: new Date(time.value).toISOString(),
				};

				const alarmData: Alarm = {
					id: String(),
					event_id: String(),
					trigger_time: new Date(time.value).toISOString(),
					user_id: userDataStore.$state.userProfile.user.user_id,
					event: eventData
				};

				const dataToSend = {
					...eventData,
					alarms: alarmData
				}

				await eventStore.addEvent(dataToSend);
				closeModal();
			}
			catch (error) {
				console.error(error);
			}
		};

		return {
			openModal,
			closeModal,
			saveAlarm: addAlarm,
			title,
			content,
			time,
			modalOpen
		};
	}
};
</script>