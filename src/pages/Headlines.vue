<template>
  <div class="headlines">
    <div class="TitleHead">
      <mt-header fixed class="headother" title="杉果头条">
        <mt-button slot="left">
          <span class="el-icon-message"></span>
        </mt-button>
      </mt-header>
    </div>
    <div class="main">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item
            v-for="(item,index) in banners"
            :key="index"
            @click.native="gotoline(item.url)"
          >
            <img :src="item.cover" alt>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="comment">
        <TitleActivity></TitleActivity>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Header } from "mint-ui";

import TitleActivity from "./Headlines/TitleActivity.vue";
import { parse } from "path";

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  data() {
    return {
      headlinedata: {},
      banners: []
    };
  },
  created() {
    this.getData();
    this.$store.commit('changeIsShowTagger',true);
  },
  methods: {
    gotoline(str) {
      let id = str.replace(/[^0-9]/gi, "");
    },
    async getData() {
      let url = "/api/headline_page.json";
      await this.$axios(url, {
        params: {
          locale: "js",
          sonkwo_version: 1,
          sonkwo_client: "mobile",
          q: ["sections", "mobile_banner"]
        },
        headers: {
          Accept: "application/vnd.sonkwo.v5+json",
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "max-age=0, private, must-revalidate",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "x-requested-with,content-type"
        }
      }).then(result => {
        this.headlinedata = result.data;
        this.banners = this.headlinedata.mobile_banner.banners;
      });
    }
  },
  components: {
    TitleActivity
  }
};
</script>
<style scoped>
html,
body {
  height: 100%;
}
body {
  background: #ccc;
}
* {
  margin: 0;
  padding: 0;
}
.headlines {
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #ffffff;
}
.TitleHead {
  height: 2.002288rem;
  padding: 0.343249rem;
}
.headother {
  background: #333;
  color: #cccccc;
  font-size: 0.800915rem !important;
}
.main {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
.main .banner {
  width: 100%;
  height: 8.924485rem;
}
.main .banner img {
  width: 100%;
  height: 100%;
}
</style>