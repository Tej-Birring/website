import { createApp } from 'vue'
import App from './App.vue'


// plugins:
import router from '/@/plugins/foundation/router'
import coreComponents from '/@/plugins/foundation/coreComponents'
import utilFunctions from '/@/plugins/foundation/utilFunctions'
// import firebase from '/@/plugins/firebase'
import notion from '/@/plugins/notion'
import animations from '/@/plugins/foundation/animations'
import notifications from "/@/plugins/foundation/popups";


// styles:
import 'virtual:windi.css'
import '/@/assets/scss/main.scss'


// external:
// import CoolLightBox from 'vue-cool-lightbox';
// import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'




// set up the app:
createApp(App)
    .use(router)
    .use(coreComponents)
    .use(utilFunctions)
    // .use(firebase)
    .use(notion)
    .use(animations)
    .use(notifications)
    .mount('#app')
