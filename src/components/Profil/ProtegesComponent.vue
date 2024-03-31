<template>
  <div class="flex items-center justify-center md:mt-36 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
    <div v-if="userData" class="bg-white n-1/3 mt-10 rounded-lg p-5">
      <div class="flex items-center justify-center flex-col">
        <h1 class="text-gray-800 mt-5"> Podopieczny </h1>
        <h1 class="text-gray-800 mt-5"> Imię i nazwisko: {{ userData.username }} </h1>
        <h1 class="text-gray-500 p-4 text-center">
          O mnie: {{ userData.about_me }}
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        username: "Jan Kowalski",
        about_me: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est ac purus pharetra auctor sit amet nec ex."
      }
    };
  }
};
</script>


<!--
<script>
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