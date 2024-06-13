import './assets/main.css'
import './utility/error.guard'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from "./App.vue";

import FontAwesomeIcon from "./utility/font-awesome";
import router from './router'
import httpCommon from "@/utility/http-common";

import BaseButton from '@/components/UI/BaseButton.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseDialog from '@/components/UI/BaseDialog.vue'

const pinia = createPinia()
const app = createApp(App)
const apiClient = httpCommon

//middleware
app.use(pinia)
app.use(router)
app.use(apiClient)

//global components
app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-dialog', BaseDialog)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
