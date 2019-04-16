<template>
  <div class="product">
    <div class="head">
      <mt-header fixed class="headother" :title="titlename">
        <mt-button slot="left" icon="back" @click="goblack"></mt-button>
        <mt-button slot="right" icon="more" @click="selectMore"></mt-button>
      </mt-header>
      <div class="select-more" v-if="ifselect">
        <div @click="gotoHome">首页</div>
        <div>消息</div>
        <div>收藏</div>
      </div>
    </div>
    <div class="main">
      <div class="headline-detail">
        <div class="headline-detail-banner">
          <img :src="url" alt>
        </div>
        <div class="title-container">
          <h2 class="headline-title">{{titledata.title}}</h2>
          <div class="account-info">
            <div class="account-img">
              <img :src="avatar" alt>
            </div>
            <div class="account-text">
              <div class="account-name">{{nickname}}</div>
              <div class="other-info">
                <span class="time-stamp">2019-3-19</span>
                <span class="up-num">
                  <span class="iconfont up-icon icon-zan"></span>
                  3
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="headline-content" v-html="this.titledata.content"></div>
        <div class="up-num-btom"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

import { Swipe, SwipeItem, Header } from "mint-ui";
import "../../js/jquery-3.3.1.js";
// import "../css/product.css";

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  data() {
    return {
      titledata: {},
      titlename: "",
      url: "",
      avatar: "",
      nickname: "",
      ifselect: false
    };
  },
  updated() {
    $(".headline-content")
      .find("img")
      .css("width", "100%");
  },
  created() {
  	this.$store.state.isShowTagger=false;
    let { id } = this.$route.params;
    let url = "/headlines/" + id + ".json";
    this.getData(url);
  },
  watch:{
  	$route(){
  		let { id } = this.$route.params;
  		if (id) {
  			let url = "/headlines/" + id + ".json";
	    	this.getData(url);
  		}
  	}
  },
  methods: {
    selectMore() {
      this.ifselect = !this.ifselect;
    },
    gotoHome() {
    	this.$store.state.isShowTagger=true;
      this.$router.push({ name: "Home" });
    },
    goblack() {
    	this.$store.state.isShowTagger=true;
      //触发store里的back函数
			this.$store.commit('storeBack',this);
    },
    async getData(gameurl) {
      let url = "/api" + gameurl;
      await this.$axios(url, {
        params: {
          sonkwo_client: "mobile",
          locale: "js",
          sonkwo_version: 1,
          sonkwo_client: "mobile"
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
        this.titledata = result.data;
        this.titlename = this.titledata.section.name;
        this.url = this.titledata.cover.url; //titledata.account.
        this.avatar = this.titledata.account.avatar;
        this.nickname = this.titledata.account.nickname;
        // this.$refs.content.innerHTML = this.titledata.content;
//      console.log("result", result.data);
      });
    }
  }
};
</script>
<style scoped>
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} */
img {
  max-width: 100%;
  height: auto;
  display: inline-block;
  vertical-align: middle;
}
.headline-detail {
  /* box-sizing: border-box; */
  text-align: center;
}
.headline-detail .headline-detail-banner {
  height: 7.8125rem;
  background-color: white;
  overflow: hidden;
}
.headline-detail .headline-detail-banner img {
  width: 80%;
  height: 100%;
}
.headline-detail .headline-content,
.headline-detail .title-container {
  background-color: #fff;
  padding: 0.9375rem;
  width: 100%;
  box-sizing: border-box;
}
.headline-detail .title-container {
  text-align: left;
  border-bottom: solid 0.0625rem #ccc;
}
.headline-detail .title-container .headline-title {
  font-size: 0.858124rem;
  font-weight: normal;
  line-height: 1.25rem;
  margin-bottom: 0.9375rem;
}
.headline-detail .title-container .account-info .account-img {
  width: 1.875rem;
  height: 1.875rem;
  float: left;
  border-radius: 100%;
  overflow: hidden;
}
.headline-detail .title-container .account-info .account-img img {
  width: 100%;
  height: 100%;
}
.headline-detail .account-text {
  margin-left: 1.875rem;
  padding-left: 0.8rem;
}
.headline-detail .account-name {
  line-height: 1em;
  font-size: 0.75rem;
  color: #666;
}
.time-stamp {
  line-height: 1em;
  font-size: 0.625rem;
  color: #999;
  margin-top: 0.25rem;
}
.headline-detail .up-num {
  float: right;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
}
.headline-detail .up-icon {
  font-size: 0.6875rem;
  margin-right: 0.425rem;
}
.headline-detail .headline-content {
  font-size: 0.800915rem;
}
.headline-detail .headline-content img {
  max-width: 100%;
  height: auto;
  display: inline-block;
  vertical-align: middle;
}
.up-num-btom {
  background-color: #fff;
  padding-bottom: 0.875rem;
  margin-bottom: 0.625rem;
}
</style>
