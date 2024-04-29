// Import our custom CSS
import '../scss/styles.scss'

// Import only the Bootstrap components we need
import { Dropdown } from 'bootstrap'

import './assets/color-modes.js'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
