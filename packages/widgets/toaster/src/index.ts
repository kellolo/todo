import { App } from 'vue'
import ToastService from 'primevue/toastservice'
import Toaster from './Toaster.vue'
import { putToast } from './store' //это сервис, который получает сообщение и помещает его в пинию

export const ToasterPlugin = {
  install(app: App) {
    app.component('Toaster', Toaster)
    app.use(ToastService)
    // app.config.globalProperties.$putToast = toast
    app.provide('toaster', putToast)
  },
}

export { putToast }
