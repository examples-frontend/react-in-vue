import { createApp } from 'vue'
import App from "./vue/App.vue";
import router from './vue/router';

// // @ts-ignore
// new Vue({
//   // router,
//   // @ts-ignore
//   render: (h) => h(App),
// }).$mount("#app");

createApp(App).use(router).mount('#root');