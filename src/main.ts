import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { plugin as formKitPlugin } from '@formkit/vue'
// import io from 'socket.io-client'
// import vue3GoogleLogin from 'vue3-google-login'
import GoogleSignInPlugin from 'vue3-google-signin'
import { formkitConfig } from './configs/formkit.config'
import { i18n } from './configs/i18n.config'
import TheToast from '@/components/shared/TheToast.vue'

//Google Auth
import * as credentials from './data/google-credentials.json'

//THEME OR CSS
import './style.css'
import '@/assets/css/style.scss'

// const URL = 'http://localhost:4000'
// const socket = io(URL, {
//   autoConnect: false
// })

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

// app.provide('socket', socket)

app.use(pinia)
app.use(router)
app.use(formKitPlugin, formkitConfig)
app.use(i18n)
app.use(GoogleSignInPlugin, {
  clientId: credentials.default.web.client_id
})

app.component('the-toast', TheToast)

app.mount('#app')
