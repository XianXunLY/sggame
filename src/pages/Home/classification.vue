<template>
  <div class="classification">
    <mt-navbar v-model="selected">
      <mt-tab-item v-for="nav in navs" :id="nav.id" :key="nav.id">{{nav.name}}</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="commend">
      <mt-tab-container-item id="1">
        <Maingame q="new_tagged_games"></Maingame>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <Maingame q="sale_tagged_games"></Maingame>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <Maingame q="presell_tagged_games"></Maingame>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <Maingame q="weekly_ranking"></Maingame>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <Maingame q="monthly_ranking"></Maingame>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import Vue from "vue";
import Maingame from "./maingame.vue";
import { Navbar, TabItem } from "mint-ui";

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
export default {
  data() {
    return {
      navs: [
        {
          name: "最新",
          id: "1"
        },
        {
          name: "促销",
          id: "2"
        },
        {
          name: "预售",
          id: "3"
        },
        {
          name: "周排行",
          id: "4"
        },
        {
          name: "月排行",
          id: "5"
        }
      ],
      selected: "1"
    };
  },
  components: {
    Maingame
  }
};
</script>
<style scoped>
.classification {
  margin-top: 10px;
  width: 100%;
  margin-bottom: 2.459954rem;
  /* height: 60.183066rem; */
}
/* .commend {
  margin-top: 0.125rem;
} */
.is-selected {
  /* border-bottom: 0.125rem solid #ff5722 !important; */
  color: #ff5722 !important;
  margin-bottom: -1.125rem !important;
}
</style>