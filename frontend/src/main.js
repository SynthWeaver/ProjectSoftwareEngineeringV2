import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router/routes.js";
import store from "../store";
import infiniteScroll from 'vue-infinite-scroll';
import { Session } from "./js/Session.js";
import "../css/global.css";

Vue.use(VueRouter);
Vue.use(infiniteScroll);

const router = new VueRouter({
  routes: routes,
  // Removes the # in the :http://localhost:8080/#/about
  // making it: http://localhost:8080/about
  mode: "history",
});

//global vars
Vue.config.productionTip = false;
Vue.prototype.$session = new Session();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
