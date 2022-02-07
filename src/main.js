import Vue from "vue";
import App from "./App.vue";
import Flag from "vue-flagpack";

Vue.use(Flag, {
  name: "Flag",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
