import './assets/main.css'
import './utility/error.guard'

import { createApp } from 'vue'
import App from "./App.vue";
import VueSelect from 'vue-select'

import FontAwesomeIcon from "./utility/font-awesome";
import pinia from '@/utility/pinia'
import router from './router'

import BaseButton from '@/components/UI/BaseButton.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseDialog from '@/components/UI/BaseDialog.vue'


const app = createApp(App)

//middleware
app.use(pinia)
app.use(router)

//global components
app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-dialog', BaseDialog)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('v-select', VueSelect)


app.mount('#app');

