<template>
  <div>
    <!-- Przycisk otwierający modal -->
    <button @click="openModal" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      Edytuj profil
    </button>

    <!-- Modal -->
    <div v-if="modalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-8 rounded-lg overflow-y-auto max-h-[80vh]">
        <!-- Treść modala -->
        <div>
          <h2 class="text-lg font-bold mb-4">Edytuj profil</h2>
          
          <form @submit.prevent="editProfile" class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                  <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imię i nazwisko</label>
                  <input v-model="username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              </div>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adres e-mail</label>
                  <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              </div>
              <div>
                  <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numer telefonu</label>
                  <input v-model="phoneNumber" type="tel" name="phone_number" id="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
              <div>
                  <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adres zamieszkania</label>
                  <input v-model="address" type="text" name="address" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
              <div>
                  <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Miasto</label>
                  <input v-model="city" type="text" name="city" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </div>
              <!-- Warunek sprawdzający rolę użytkownika i wyświetlający odpowiednie pola -->
              <div v-if="userRole === 'Podopieczny'">
                  <div>
                      <label for="height" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wzrost</label>
                      <input v-model="height" type="number" name="height" id="height" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
                  <div>
                      <label for="weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Waga</label>
                      <input v-model="weight" type="number" name="weight" id="weight" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </div>
              </div>
              <div>
                  <label for="about_me" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Opis użytkownika</label>
                  <textarea v-model="aboutMe" name="about_me" id="about_me" rows="3" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
              </div>
              <button type="submit" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Zapisz zmiany</button>
          </form>
        </div>
        <!-- Przycisk zamykający modal -->
        <div class="flex justify-end mt-6">
          <button @click="closeModal" class="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Anuluj
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
      username: '',
      email: '',
      phoneNumber: '',
      address: '',
      city: '',
      aboutMe: '',
      height: '',
      weight: '',
      userRole: '' // Dodaj zmienną przechowującą rolę użytkownika
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
      // Pobierz dane użytkownika z serwera i wypełnij nimi pola formularza
      axios.get('https://localhost:8081/api')
        .then(response => {
          const userData = response.data;
          this.username = userData.username;
          this.email = userData.email;
          this.phoneNumber = userData.phone_number;
          this.address = userData.address;
          this.city = userData.city;
          this.aboutMe = userData.about_me;
          this.height = userData.height; // Dodajemy wysokość z danych użytkownika
          this.weight = userData.weight; // Dodajemy wagę
          this.userRole = userData.role; // Przypisz rolę użytkownika do zmiennej userRole
        })
        .catch(error => {
          console.error('Błąd:', error);
        });
    },
    closeModal() {
      this.modalOpen = false;
    },
    editProfile() {
      // Wyślij żądanie POST do serwera z danymi do aktualizacji profilu
      axios.post('https://localhost:8081/api', {
        username: this.username,
        email: this.email,
        phone_number: this.phoneNumber,
        address: this.address,
        city: this.city,
        about_me: this.aboutMe,
        height: this.height, // Dodajemy wysokość
        weight: this.weight // Dodajemy wagę
      })
      .then(response => {
        // Obsłuż odpowiedź z serwera
        console.log('Odpowiedź z serwera:', response.data);
        // Tutaj możesz dodać kod obsługi sukcesu, np. wyświetlenie komunikatu o sukcesie
      })
      .catch(error => {
        // Obsłuż błąd
        console.error('Błąd:', error);
        // Tutaj możesz dodać kod obsługi błędu, np. wyświetlenie komunikatu o błędzie
      });
    }
  }
};
</script>

<style>
/* Dostosuj stylizację modala według potrzeb */
</style>
