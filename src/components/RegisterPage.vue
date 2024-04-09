<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" class="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
      Care Buddy
    </a>
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
          Utwórz nowe konto
        </h1>
        <form @submit.prevent="register" class="space-y-4 md:space-y-6">
          <div>
            <label for="email" class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">Twój adres e-mail</label>
            <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="twójadres@email.com" required>
          </div>
          <div>
            <label for="password" class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">Hasło</label>
            <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div>
            <label for="confirm-password" class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">Potwierdź hasło</label>
            <input v-model="confirmPassword" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-m rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required>
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Akceptuję <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Politykę prywatności</a></label>
            </div>
          </div>
          <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Utwórz konto</button>
          <p class="text-xl font-light text-white- dark:text-white">
            Posiadasz już konto? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500"><router-link to="/logowanie">Zaloguj się</router-link></a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const register = () => {
  if (password.value !== confirmPassword.value) {
    console.error('Hasła nie pasują do siebie');
    return;
  }

  axios.post('https://example.com/api/register', { email: email.value, password: password.value })
    .then(response => {
      // Obsłuż odpowiedź z serwera
      console.log('Odpowiedź z serwera:', response.data);
      // Tutaj można obsłużyć sukces rejestracji, np. przekierowanie
    })
    .catch(error => {
      // Obsłuż błąd
      console.error('Błąd:', error);
      // Tutaj możemy obsłużyć nieudaną rejestrację, np. wyświetlenie komunikatu o błędzie
    });
}
</script>