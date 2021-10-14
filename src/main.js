import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPen, faEraser, faFill, faTrashAlt,
  faPlusCircle, faMinusCircle, faUndo, faRedo,
  faFolderOpen, faSave
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([
  faPen, faEraser, faFill, faTrashAlt, faPlusCircle, faMinusCircle,
  faUndo, faRedo, faFolderOpen, faSave
]);
//library.add(faEraser);

import App from '@/App.vue'
import router from '@/router/index'

//import store from '@/stores/index'

import '@/assets/css/main.css'

createApp(App)
  .use(router)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  //.use(store)
  .mount('#app')