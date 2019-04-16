<template>
  <div class="titleactivity">
    <mt-navbar v-model="selected" class="title">
      <mt-tab-item v-for="nav in navs" :id="nav.id" :key="nav.id">{{nav.name}}</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="commend">
      <mt-tab-container-item id="1">
        <Titlegame :q="[]"></Titlegame>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <Titlegame :q="[1,2,3,11,32,34,36,45,46]"></Titlegame>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <Titlegame :q="[4,21,31,37,38,39,40,41,42,43,44]"></Titlegame>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <Titlegame :q="[13,14,15,23,24,29,30,47,48]"></Titlegame>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import Vue from "vue";
import { Navbar, TabItem } from "mint-ui";

import Titlegame from "./titlegame.vue";

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
export default {
  data() {
    return {
      navs: [
        {
          name: "推荐",
          id: "1"
        },
        {
          name: "咨询",
          id: "2"
        },
        {
          name: "文章",
          id: "3"
        },
        {
          name: "视频",
          id: "4"
        }
      ],
      selected: "1"
    };
  },
  components: {
    Titlegame
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.titleactivity {
  width: 100%;
}
.title {
  height: 1.716247rem;
  line-height: 1.716247rem;
  /* padding: 0.514874rem 0; */
}
.mt-tab-item {
  padding: 0.514874rem 0;
}
.commend {
  margin-top: 0.125rem;
}
.is-selected {
  border-bottom: 0.125rem solid #ff5722 !important;
  color: #ff5722 !important;
  margin-bottom: -0.125rem !important;
}
</style>
