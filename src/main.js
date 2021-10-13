import { createApp } from 'vue'
import App from '@/App.vue'

import router from '@/router/index'
//import store from '@/stores/index'

import '@/assets/css/main.css'

createApp(App)
  .use(router)
  //.use(store)
  .mount('#app')