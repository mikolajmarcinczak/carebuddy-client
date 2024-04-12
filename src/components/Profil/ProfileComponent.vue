<template>
  <div class="flex flex-col items-center justify-center px-0 py-0 mx-auto md:mt-36 lg:py-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
    <div class="flex items-center justify-center">
      <div class="bg-white n-1/3 mt-10 rounded-lg">
        <div class="flex items-center justify-center flex-col">
          <img src="/src/assets/logo.jpg" alt="Logo CareBuddy">
          <h1 class="text-gray-800 mt-5"> Imię i nazwisko: {{ userData.username }} </h1>
          <h1 class="text-gray-400 p-4" v-if="userData.role === 'Opiekun' || userData.role === 'Podopieczny'"> Rola: {{ userData.role }} </h1>
          <h1 class="text-gray-500 p-4 text-center" v-if="userData.role === 'Opiekun' || userData.role === 'Podopieczny'">
            O mnie: {{ userData.about_me }}
          </h1>
          <h1 class="text-gray-400 p-4" v-if="userData.role === 'Opiekun' || userData.role === 'Podopieczny'"> Miasto: {{ userData.city }} </h1>
          <h1 class="text-gray-400 p-4"> Nr tel: {{ userData.phone_number }} </h1>
          <h1 class="text-gray-400 p-4" v-if="userData.role === 'Podopieczny'"> Wzrost: {{ userData.height }} </h1>
          <h1 class="text-gray-400 p-4" v-if="userData.role === 'Podopieczny'"> Waga: {{ userData.weight }} </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: 'Jan Kowalski',
        role: 'Podopieczny',
        about_me: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est ac purus pharetra auctor sit amet nec ex.',
        city: 'Warszawa',
        phone_number: '123456789',
        height: '180 cm',
        weight: '75 kg'
      }
    };
  }
};
</script>
<!-- <script>
import axios from 'axios';

const userData = ref(null);

onMounted(() => {
  fetchUserData();
});

const fetchUserData = () => {
  axios.get('https://localhost:8081/api')
    .then(response => {
      userData.value = response.data;
    })
    .catch(error => {
      console.error('Błąd podczas pobierania danych:', error);
    });
};
</script>
-->
<style scoped>
/* Dodaj stylizację według potrzeb */
</style>