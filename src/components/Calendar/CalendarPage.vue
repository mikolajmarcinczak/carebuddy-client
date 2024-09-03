<template>
	<div class="max-w-6xl mx-auto text-black">
		<div class="flex justify-between mb-4 mt-16">
			<button @click="previousWeek"
              class="p-2 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
		                 focus:ring-4 focus:outline-none focus:ring-green-200 text-white font-medium
		                 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Previous Week</button>
			{{ currentWeek}}
			<button @click="nextWeek"
              class="p-2 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
		                 focus:ring-4 focus:outline-none focus:ring-green-200 text-white font-medium
		                 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Next Week</button>
		</div>
		<WeekView :weekStart="currentWeek"/>
		<EventForm @add-event="addEvent"/>
	</div>
</template>

<script lang="ts">
import {useEventStore} from "@/stores/event.module";
import {computed} from "vue";
import WeekView from "./WeekView.vue";
import EventForm from "./EventForm.vue";
import {CalendarEvent} from "@/types/event.model";

export default {
	name: "Calendar",
	components: {EventForm, WeekView},
	setup() {
		const store = useEventStore();
		const currentWeek = computed(() => store.getCurrentWeek);

		const previousWeek = () => {
			const newDate = new Date(currentWeek.value);
			newDate.setDate(newDate.getDate() - 7);
			store.setCurrentWeek(newDate);
		};

		const nextWeek = () => {
			const newDate = new Date(currentWeek.value);
			newDate.setDate(newDate.getDate() + 7);
			store.setCurrentWeek(newDate);
		};
		return {
			currentWeek,
			previousWeek,
			nextWeek,
			store
		};
	},
	methods: {
		addEvent(event: CalendarEvent) {
			this.store.addEvent(event);
		}
	}
}
</script>