<template>
  <div class="flex flex-col items-center justify-center px-0 py-0 mx-auto md:mt-36 lg:py-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
    <div class="flex items-center justify-center">
      <div class="bg-white n-1/3 mt-10 rounded-lg">
        <div class="flex items-center justify-center flex-col">
          <img src="/src/assets/logo.jpg" alt="Logo CareBuddy">
          <h1 class="text-gray-800 mt-5"> Imię i nazwisko: {{ userData.username }} </h1>
          <h1 class="text-gray-400 p-4"> Rola: {{ userData.role }} </h1>
          <h1 class="text-gray-500 p-4 text-center">
            O mnie: {{ userData.about_me }}
          </h1>
          <h1 class="text-gray-400 p-4"> Miasto: {{ userData.city }} </h1>
          <h1 class="text-gray-400 p-4"> Nr tel: {{ userData.phone_number }} </h1>
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
        role: 'Opiekun',
        about_me: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est ac purus pharetra auctor sit amet nec ex.',
        city: 'Warszawa',
        phone_number: '123456789'
      }
    };
  }
};
</script>
<!-- <script>
import axios from 'axios';

export default {
  data() {
    return {
      userData: null
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      axios.get('https://example.com/api/userData')
        .then(response => {
          this.userData = response.data;
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych:', error);
        });
    }
  }
};
</script>
-->
<style scoped>
/* Dodaj stylizację według potrzeb */
</style>