import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { Scrollama } from 'vue-scrollama' // Import Scrollama from vue-scrollama

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.component('ScrollamaWrapper', Scrollama) // Register Scrollama globally
app.mount('#app')
