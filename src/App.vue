<template>

	<main>
		<Navigation/>
		<router-view/>
		<Suspense>
			<StoreInit/>
			<footer-component/>
		</Suspense>
	</main>
</template>

<script lang="ts">

import { RouterView } from 'vue-router';
import Navigation from "@/components/UI/NavigationMenu.vue";
import TheWelcome from "@/components/TheWelcome.vue";
import StoreInit from "@/components/UI/StoreInit.vue";
import FooterComponent from "@/components/UI/FooterComponent.vue";

export default {
  name: 'App',
  components: {
    FooterComponent,
    StoreInit,
    Navigation,
    TheWelcome,
    RouterView
  },
  // setup() {
  //   const authStore = useAuthStore();
  //   const userDataStore = useUserDataStore();
  //
  //   onMounted(async () => {
  //     if (authStore.$state.status.loggedIn) {
  //       await userDataStore.fetchUserProfile();
  //     }
  //   });
  // }
}
</script>


<style>
body {
	background-color: white;
}

</style>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
-->