import '@/shared/styles/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeView from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import { router } from './providers'

import { ToasterPlugin } from '@repo/widgets'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeView, {
  theme: {
    preset: Aura,
  },
})
app.use(ToasterPlugin)

app.mount('#app')
