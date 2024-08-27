import './assets/main.css'
import './utility/error.guard'

import App from "./App.vue";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSelect from 'vue-select'

import FontAwesomeIcon from "./utility/font-awesome";
import router from './router'
import httpCommon from "@/utility/http-common";

import BaseButton from '@/components/UI/BaseButton.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseDialog from '@/components/UI/BaseDialog.vue'

const pinia = createPinia()
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

app.mount('#app')
