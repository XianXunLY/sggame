<template>
  <div class="Home">
    <div class="Head">
      <div class="HomeHead">
        <mt-header fixed class="headother">
          <mt-button slot="left">大陆站</mt-button>
          <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <div class="headselect">
          <span></span>
          搜索你想要的游戏
        </div>
      </div>
    </div>

    <div class="main">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(banner,index) in banners" :key="index">
            <img :src="banner.cover" @click="gotoURL(banner.url)">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="comment">
        <Activity :homedata="homedata"></Activity>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem, Header } from "mint-ui";

// 映入组件
import Activity from "./Home/activity.vue";

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  data() {
    return {
      homedata: {},
      banners: []
    };
  },
  components: {
    Activity
  },
  methods: {
    gotoURL(url) {
      location.href = url;
    },
    async getData() {
      let url = "/api/v5/home.json";
      let { data } = await this.$axios(url, {
        params: {
          locale: "js",
          sonkwo_version: 1,
          sonkwo_client: "mobile",
          q: [
            "mobile_banner",
            "headlines",
            "sec_kill",
            "recommend_skus",
            "change_skus",
            "booths",
            "groups",
            "recommend_posts",
            "recommend_headlines"
          ],
          _: 1552968814858
        },
        headers: {
          Accept: "application/vnd.sonkwo.v5+json",
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "max-age=0, private, must-revalidate",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "x-requested-with,content-type"
        }
      });
      this.homedata = data;
      this.banners = this.homedata.mobile_banner.banners;
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style  lank="sass"  scoped>
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
.Home {
  display: flex;
  height: 100%;
  background: #f5f5f5;
  flex-direction: column;
}
.Head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.HomeHead {
  height: 2.745995rem;
  position: relative;
  /* top: 0; */
}
.headother {
  font-size: 0.686499rem;
  background: #333;
}
.headselect {
  position: absolute;
  /* left: 50%; */
  top: 10%;
  transform: translate(43%, 0);
  z-index: 999;
  color: #fff;
  font-size: 0.686499rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.830664rem;
  width: 10.755149rem;
  border-radius: 0.915332rem;
  background: rgba(102, 102, 102, 0.4);
}

.main {
  padding-top: 2.402746rem;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
.main .banner {
  width: 100%;
  height: 11.498856rem;
}
.main .banner img {
  width: 100%;
  height: 100%;
}
</style>

