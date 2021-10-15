import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPen, faEraser, faFill, faTrashAlt,
  faPlusCircle, faMinusCircle, faUndo, faRedo,
  faFolderOpen, faSave, faSquare, faDotCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([
  faPen, faEraser, faFill, faTrashAlt, faPlusCircle, faMinusCircle,
  faUndo, faRedo, faFolderOpen, faSave, faSquare, faDotCircle
]);

import App from '@/App.vue'
import router from '@/router/index'

import '@/assets/css/main.css'

createApp(App)
  .use(router)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')