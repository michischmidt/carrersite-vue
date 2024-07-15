// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './router'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(VueQueryPlugin)
app.use(router)
app.mount('#app')
