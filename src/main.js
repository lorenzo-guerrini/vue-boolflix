import Vue from "vue";
import App from "./App.vue";

import Flag from "vue-flagpack";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(farStar);
library.add(fasStar);

Vue.component("fas", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Flag, {
  name: "Flag",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
