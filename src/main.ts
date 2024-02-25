import './assets/main.css'
import './utility/error.guard'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

import BaseButton from '@/components/UI/BaseButton.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import BaseDialog from '@/components/UI/BaseDialog.vue'

const app = createApp(App)

//middleware
app.use(createPinia())
app.use(router)

//global components
app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-dialog', BaseDialog)

app.mount('#app')
