<template>
	<main class="mt-24">
		<CaregiverList />
	</main>
</template>

<script lang="ts">
import CaregiverList from "@/components/Search/CaregiverList.vue";

export default {
	name: "CaregiversView",
	components: {
		CaregiverList
	}
}
</script>

<style scoped>

</style>