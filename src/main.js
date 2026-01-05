

//import { createApp } from 'vue'
//import './style.css'
//import App from './App.vue'
//
//createApp(App).mount('#app')


import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(PrimeVue)

app.mount('#app')


