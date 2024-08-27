<template>
	<div>
		<button @click="openModal" class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Dodaj zdarzenie</button>
			<div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">

				<div class="bg-white p-8 rounded-lg overflow-y-auto max-h-[80vh]">

					<div>
							<h2 class="text-lg font-bold mb-4">Dodaj zdarzenie</h2>

							<form @submit.prevent="submitForm" class="space-y-4 max-w-md mx-auto mt-4 p-4 border rounded shadow-md">
								<input v-model="title" placeholder="Event Title" required class="w-full p-2 border rounded" />
								<input v-model="date" type="datetime-local" required class="w-full p-2 border rounded" />
								<div class="flex items-center">
									<label for="recurring">Recurring Event</label>
									<input v-model="isRecurring" id="recurring" type="checkbox" class="mr-2" />
								</div>
								<button type="submit" class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Event</button>
							</form>
					</div>
						<!-- Button to close the modal -->
					<div class="flex justify-end mt-6">
							<button @click="closeModal" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								Anuluj
							</button>
					</div>
				</div>
			</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "EventForm",
	data() {
		return {
			title: "",
			date: "",
			showForm: false,
			isRecurring: false,
			modalOpen: false
		}
	},
	emits: ['add-event'],
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
				id: Date.now().valueOf(),
				title: this.title,
				date: formattedDate,
				recurring: this.isRecurring
			});
			this.title = "";
			this.date = "";
			this.isRecurring = false;
			this.closeModal();
		}
	}
}
</script>

<style scoped>

</style>