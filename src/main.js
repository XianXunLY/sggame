import Vue from "vue";
import App from "./App.vue";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入vuex的store配置
import store from './store'
//引入vue_router
import router from "./router";

Vue.use(MintUI);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
