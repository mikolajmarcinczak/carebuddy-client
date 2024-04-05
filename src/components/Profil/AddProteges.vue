<template>
  <div>
    <!-- Przycisk otwierający modal -->
    <button @click="openModal" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      Dodaj podopiecznego
    </button>

    <!-- Modal -->
    <div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-8 rounded-lg">
        <!-- Treść modala -->
        <div>
          <h2 class="text-lg font-bold mb-4">Dodaj podopiecznego</h2>
          <p>Wyszukaj podopiecznego</p>
        </div>
        <div>
          <label for="email" class="block mb-2  font-medium text-gray-900 dark:text-white">Adres e-mail podopiecznego</label>
          <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-l rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="twójadres@email.com" required>
        </div>
        <!-- Przycisk zamykający modal -->
        <div class="flex justify-end mt-6">
          <button @click="addUser" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Dodaj podopiecznego
          </button>
          <button @click="closeModal" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 m-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Zamknij
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      modalOpen: false,
      email: ''
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    addUser() {
      axios.post('https://example.com/api/addUser', { email: this.email })
        .then(response => {
          console.log('Użytkownik dodany pomyślnie');
          // Tutaj możesz dodać dodatkową logikę, np. odświeżenie listy użytkowników
        })
        .catch(error => {
          console.error('Błąd podczas dodawania użytkownika:', error);
        });
    }
  }
};
</script>

<style>
/* Dostosuj stylizację modala według potrzeb */
</style>
