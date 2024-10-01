<template>
	<div>
		<h2 class="text-xl font-bold mb-4">Najbliższe alarmy: </h2>
		<ul>
			<li v-for="alarm in nextAlarms" :key="alarm.id">
				<p>{{ alarm.message }}</p>
				<p>{{ new Date(alarm.trigger_time).toLocaleString() }}</p>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useEventStore } from '@/stores/event.module';
import {useUserDataStore} from "@/stores/user-data.module";
import {Alarm} from "@/types/alarm.model";

export default {
	name: 'NextAlarmsList',
	setup() {
		const eventStore = useEventStore();
		const userDataStore = useUserDataStore();
		const nextAlarms = ref<Alarm[]>([]);

		onMounted(async () => {
			const userId = userDataStore.getUserProfile?.user?.user_id;
			if (userId) {
				const events = await eventStore.fetchEventsByUser(userId);
				nextAlarms.value = await eventStore.fetchAlarmsForCurrentUser();;
			}
		});

		return {
			nextAlarms
		};
	}
};
</script>