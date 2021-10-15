import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faPen, faEraser, faFill, faTrashAlt,
  faPlusCircle, faMinusCircle, faUndo, faRedo,
  faFolderOpen, faSave, faSquare, faDotCircle,
  faSquareFull, faCircle,
  faBorderAll, faEllipsisV, faBorderNone
} from '@fortawesome/free-solid-svg-icons';

import { faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';

library.add(
  faPen, faEraser, faFill, faTrashAlt, faPlusCircle, faMinusCircle,
  faUndo, faRedo, faFolderOpen, faSave, faSquare, faDotCircle,
  faBorderAll, faEllipsisV, faBorderNone, farSquare, faSquareFull, faCircle
);

import App from '@/App.vue'
import router from '@/router/index'

import '@/assets/css/main.css'

createApp(App)
  .use(router)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')