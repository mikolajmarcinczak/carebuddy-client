<template>
  <div>
    <button @click="openModal"
						class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
						focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
						rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      Zmień hasło
    </button>

    <div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-gray-800 p-8 rounded-lg overflow-y-auto max-h-[80vh]">
        <div>
          <h2 class="text-lg font-bold mb-4">Zmień hasło</h2>
					<div>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                  <label for="email"
												 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Twój e-mail
									</label>
                  <input type="email" name="email" id="email"
												 class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
												 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
												 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
												 dark:focus:border-blue-500" placeholder="name@company.com" required>
              </div>
              <div>
                  <label for="password"
												 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Nowe hasło
									</label>
                  <input type="password" name="password" id="password" placeholder="••••••••"
												 class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
												 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
												 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
												 dark:focus:border-blue-500" required>
              </div>
              <div>
                  <label for="confirm-password"
												 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Powtórz hasło
									</label>
                  <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
												 class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
												 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
												 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
												 dark:focus:border-blue-500" required>
              </div>
              <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="newsletter" aria-describedby="newsletter" type="checkbox"
													 class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300
													 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
													 required>
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="newsletter"
													 class="font-light text-gray-500 dark:text-gray-300">
											I accept the <a	class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
												Terms and Conditions
											</a>
										</label>
                  </div>
              </div>
              <button
									class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
									focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800
									font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">Reset passwod</button>
          </form>
      </div>
        </div>

        <div class="flex justify-end mt-6">
          <button @click="closeModal"
									class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
									focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium
									rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700">
            Zamknij
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {User} from "@/types/user.model";

export default {
  data() {
    return {
      modalOpen: false
    };
  },
	props: {
		user: {
			type: User,
			required: true
		}
	},
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    }
  }
};

</script>

<style>
</style>