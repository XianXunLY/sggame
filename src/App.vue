<template>
  <div id="app">
  	<keep-alive>
  		<router-view></router-view>
  	</keep-alive>
    
    <navmenu v-if="$store.state.isShowTagger"></navmenu>
  </div>
</template>
<script>
import axios from 'axios';
import navmenu from './pages/navMenu'
import Vue from "vue";
// 把axios设置到Vue的原型对象上，方便在任意组件中使用
Vue.prototype.$axios = axios;
//设置请求头
// axios.defaults.headers.post["Content-type"] = "appliction/x-www-form-urlencoded"
export default {
  name: "app",
  data() {
    return {
    	
    };
  },
  components:{
  	navmenu
  },
  created() {
  	//刷新后，当前导航样式丢失
  }
};
</script>

<style>
</style>
