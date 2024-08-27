<template>
	<div class="max-w-6xl mx-auto text-black">
		<div class="flex justify-between mb-4 mt-16">
			<button @click="previousWeek" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Previous Week</button>
			{{ currentWeek}}
			<button @click="nextWeek" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Next Week</button>
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