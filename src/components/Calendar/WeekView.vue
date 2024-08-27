<template>
	<div class="grid grid-cols-8 gap-4 p-4">
		<div class="border p-2 rounded-lg shadow-md">
			<div class="h-12 mt-2"></div>
			<div v-for="(slot, index) in timeSlots" :key="slot" :style="{ height: `${slotHeights[index]}rem`, color: '#000' }"
					 class="border-b p-1 flex items-center justify-center h-16">
				{{ slot }}
			</div>
		</div>
		<div v-for="day in days" :key="day.date" class="w-48 border p-2 rounded-lg shadow-md">
			<h4 class="text-md text-stone-950 font-semibold mb-1">{{ day.dateString }}</h4>
			<h5 class="text-sm text-green-800 font-bold mb-2">{{ day.weekDay }}</h5>
			<div v-for="(slot, index) in day.slots" :key="slot.time"
					 class="border-b p-1 cursor-pointer flex flex-wrap items-center justify-start w-24 md:w-32"
					 :class="{ 'overflow-y-auto': slot.events.length > 3 }"
					 :style="{ height: `${slotHeights[index]}rem`, maxHeight: '12rem' }"
					 @click="handleSlotClick(day.date, slot.time)">
				<div v-for="event in slot.events" :key="event.id"
						 @click.stop="handleEventClick(event)"
						 class="bg-blue-100 p-2 rounded mb-1 mr-1 flex-1 overflow-hidden text-ellipsis whitespace-nowrap w-1s2">
					{{ event.title }}
				</div>
				<div v-if="slot.events.length === 0" class="h-16">
					&nbsp;
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {computed, ref} from "vue";
import {useEventStore} from "@/stores/event.module";
import {CalendarEvent} from "@/types/event.model";

export default {
	name: "WeekView",
	props: ['weekStart'],
	setup(props) {
		const store = useEventStore();
		const slotHeights = ref<number[]>([]);

		const timeSlots = Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`);

		const days = computed(() => {
			const start = new Date(props.weekStart);
			const diff = (start.getDay() === 0 ? -6 : 1) - start.getDay();
			start.setDate(start.getDate() + diff);

			return Array.from({ length: 7 }, (_, i) => {
				const date = new Date(start);
				date.setDate(date.getDate() + i);
				const slots = Array.from({ length: 48 }, (_, j) => {
					const time = `${String(Math.floor(j / 2)).padStart(2, '0')}:${j % 2 === 0 ? '00' : '30'}`;
					const events = store.eventsForCurrentWeek(start).filter(event => {
						const eventDate = new Date(event.time);
						const eventHour = eventDate.getHours();
						const eventMinutes = eventDate.getMinutes();
						const slotHour = Math.floor(j / 2);
						const slotMinutes = j % 2 === 0 ? 0 : 30;
						return (eventDate.toDateString() === date.toDateString()
										&& eventHour === slotHour
										&& ((eventMinutes >= 0 && eventMinutes < 30 && slotMinutes === 0) || (eventMinutes >= 30 && slotMinutes === 30)))
								|| (event.recurring && eventHour === slotHour
										&& ((eventMinutes >= 0 && eventMinutes < 30 && slotMinutes === 0) || (eventMinutes >= 30 && slotMinutes === 30)));
					});
					return { time, events };
				});
				return {
					date: date.toDateString(),
					dateString: date.toDateString().substring(4),
					weekDay: date.toLocaleDateString('en-US', { weekday: 'long' }),
					slots
				}
			})
		});

		const handleSlotClick = (date: string, time: string) => {
			const [hours, minutes] = time.split(':').map(Number);
			const eventDate = new Date(date);
			eventDate.setHours(hours, minutes);
			console.log('Add event at:', eventDate);
		}

		const handleEventClick = (event: CalendarEvent) => {
			console.log('Event clicked:', event);
		}

		const eventsForDay = (day: string) => {
			const date = new Date(day);
			return store.eventsForCurrentWeek(date).filter(event => {
				if (event.recurring) {
					return true;
				}
				else {
					const eventDate = new Date(event.time);
					return eventDate.toDateString() === date.toDateString();
				}
			});
		};

		return {
			days,
			timeSlots,
			slotHeights,
			eventsForDay,
			handleSlotClick,
			handleEventClick
		};
	},
	methods: {
		updateSlotHeights() {
			const heights = [];
			for (let i = 0; i < 48; i++) {
				let maxH = 4;
				for (const day of this.days.values()) {
					const slot = day.slots[i];
					const height = Math.ceil(slot.events.length) * 4;
					if (height > maxH) {
						maxH = height;
					}
				}
				heights.push(maxH);
				this.slotHeights.push(maxH);
			}
		}
	},
	mounted() {
		this.updateSlotHeights();
	},
	watch: {
		days: {
			handler() {
				this.updateSlotHeights();
			},
			deep: true
		}
	}
}
</script>

<style scoped>
.grid {
	display: table;
	grid-template-columns: repeat(8, 1fr);
	width: 100%;
}
.grid-cols-8 > div {
	display: table-cell;
	vertical-align: top;
}
.border-b {
	border-bottom: 1px solid #ccc;
}
.cursor-pointer {
	cursor: pointer;
}
.h-16 {
	height: 4rem;
}
.flex-1 {
	flex: 1 1 auto;
}

.overflow-hidden {
	overflow: hidden;
}
.text-ellipsis {
	text-overflow: ellipsis;
}
.whitespace-nowrap {
	white-space: nowrap;
}

.w-1s2 {
	width: 48%;
}
</style>