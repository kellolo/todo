import '@/style/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeView from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeView, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
