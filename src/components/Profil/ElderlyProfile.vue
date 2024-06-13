<template>
  <div class="flex flex-col items-center justify-center px-0 py-0 mx-auto md:mt-36 lg:py-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
    <div class="flex items-center justify-center">
      <div class="bg-white n-1/3 mt-10 rounded-lg">
        <div class="flex items-center justify-center flex-col">
          <img src="/src/assets/logo.jpg" alt="Logo CareBuddy">
          <h1 class="text-gray-800 mt-5"> Imię i nazwisko: {{userData.user?.username}} </h1>
					<h1 class="text-gray-400 p-4"> Rola: {{userData.user?.role}} </h1>
					<h1 class="text-gray-500 p-4 text-center"> O mnie: {{ userData.about_me || 'Brak opisu'}} </h1>
					<h1 class="text-gray-400 p-4"> e-mail: {{ userData.user?.email }} </h1>
					<h1 class="text-gray-400 p-4"> Adres zamieszkania: {{ userData.address }}, {{ userData.city }} </h1>
					<h1 class="text-gray-400 p-4"> Nr tel.: {{ userData.phone_number }} </h1>
					<h1 class="text-gray-400 p-4"> Nr awaryjny: {{ userData.emergency_number }} </h1>
					<h1 class="text-gray-400 p-4"> Wzrost: {{ userData.height }} </h1>
					<h1 class="text-gray-400 p-4"> Waga: {{ userData.weight }} </h1>
					<h1 class="text-gray-400 p-4">Data urodzenia: {{ Date.parse(userData.date_of_birth).valueOf() }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
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
</script> -->
<script lang="ts">
/*
import axios from 'axios';
import { onMounted, reactive } from 'vue';

export default {
  setup() {
    const userData = reactive({
      username: '',
      role: '',
      about_me: '',
      city: '',
      phone_number: '',
      height: '',
      weight: '',
      email: ''
    });
    
    const fetchUserData = async () => {
      const response = await axios.get('http://localhost:8081/api/user/?identifier=ce45d717-b071-4d18-913f-306ff85893d9')
        .then(response => {
          console.log('Dane pobrane:', response.data);
          const fetchedData = response.data;
          userData.username = fetchedData.username;
          userData.role = fetchedData.role;
          userData.about_me = fetchedData.about_me;
          userData.city = fetchedData.city;
          userData.phone_number = fetchedData.phone_number;
          userData.height = fetchedData.height;
          userData.weight = fetchedData.weight;
          userData.email = fetchedData.email;
          
        })
        .catch(error => {
          console.error('Błąd podczas pobierania danych:', error);
        });
        console.log('Nazwa użytkownika:', userData.username);
        console.log('Nazwa maila:', userData.email);
    };
    console.log(userData)
    onMounted(() => {
      fetchUserData();
    });

    return {
      userData
    };
  }
}; 

*/

import { ElderlyProfile } from "@/types/elderly-profile.model";
import {auth} from "@/stores/auth.module";

const authStore = auth();

export default {
	name: 'ElderlyProfile',
	props: {
		userData: {
			type: ElderlyProfile,
			required: true
		}
	},
	computed: {
		currentUser() {
			return authStore.$state.user;
		}
	},
	mounted() {
		if (!this.currentUser) {
			this.$router.push('/login');
		}
	}
    
    /*const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/user/?identifier=ce45d717-b071-4d18-913f-306ff85893d9');
        console.log('Dane pobrane:', response.data);
        const fetchedData = response.data.data; // zmieniłem na response.data.data, aby uzyskać dostęp do właściwej struktury danych
        userData.username = fetchedData.username;
        userData.role = fetchedData.role;
        userData.email = fetchedData.email;
        
        console.log('Nazwa użytkownika:', userData.username);
        console.log('Rola:', userData.role);
        console.log('Email:', userData.email);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    return {
      userData
    };
  }*/
};


</script>

<style scoped>
/* Dodaj stylizację według potrzeb */
</style>