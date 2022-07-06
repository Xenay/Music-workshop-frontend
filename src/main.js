import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import LazyTube from "vue-lazytube";
import axios from "axios";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;
const base = axios.create({
  baseURL: "https://musicworkshop.herokuapp.com/",
});
Vue.prototype.$http = base;
Vue.config.productionTip = false;
Vue.use(LazyTube);
new Vue({
  router,

  render: (h) => h(App),
}).$mount("#app");
