<template>
  <div class="product">
    <div class="head">
      <mt-header fixed class="headother" :title="summary">
        <mt-button slot="left" icon="back" @click="goblack"></mt-button>
        <mt-button slot="right" icon="more" @click="selectMore"></mt-button>
      </mt-header>
      <div class="select-more" v-if="ifselect">
        <div @click="gotoHome">首页</div>
        <div>消息</div>
      </div>
    </div>
    <div class="main">
      <!-- 轮播图 -->
      <div class="banner">
        <mt-swipe :auto="4000" :showIndicators="false">
          <mt-swipe-item class="img_item" v-for=" (item,index) in gamedata.snapshots" :key="index">
            <span>{{index+1}}/{{gamedata.snapshots.length}}</span>
            <img :src="item.url" alt>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <!-- 价格 -->
      <div class="game-info-simple">
        <div class="game-badge-container">
          <div class="game-info-title">{{sku_name}}</div>
          <div class="game-info-alias">{{sku_ename}}</div>
        </div>
        <div class="game-info-price">
          <div class="game-info-sale-price">
            <span>￥{{price}}</span>
          </div>
          <div class="discount-tipp">-53%</div>
          <div class="sk-discount-font">￥{{list_price}}</div>
        </div>
      </div>
      <!-- 激活方式 -->
      <div class="product-info-entrance" style="margin-bottom: 0.625rem;">
        <div class="entrance-title">激活方式</div>
        <div class="entrance-content" v-html="activation"></div>
      </div>
      <!-- 评价 -->
      <div class="evaluation-container">
        <div class="evaluation-list">
          <div class="num">0</div>
          <div class="word">好友拥有</div>
        </div>
        <div class="evaluation-list">
          <div class="num">0</div>
          <div class="word">好友想玩</div>
        </div>
        <div class="evaluation-list">
          <div class="num">0</div>
          <div class="word">玩家想玩</div>
        </div>
      </div>
      <!-- 游戏参数 -->
      <div class="product-info-entrance aboutgame">
        <div class="entrance-title">发售情况</div>
        <!-- <div class="entrance-content"></div> -->
        <span class="el-icon-arrow-right"></span>
      </div>
      <div class="product-info-entrance aboutgame">
        <div class="entrance-title">配置情况</div>
        <span class="el-icon-arrow-right"></span>
      </div>
      <!-- 相关游戏 -->
      <div class="developer-skus-container">
        <div class="developer-skus-header">
          <div class="title">同一开发商的其他作品</div>
          <div class="view-more">查看更多</div>
        </div>
        <div class="sk-touch-group">
          <div ref="lunbo" class="lunbo">
            <div
              class="store-item-card-container"
              v-for="item in gamedata.developer_skus"
              :key="item.id"
            >
              <div class="card-img">
                <img :src="item.sku_cover" alt>
              </div>
              <div class="card-content">
                <div class="title">{{item.sku_name}}</div>
                <div class="price-content">
                  ￥{{item.price}}
                  <div class="discount">-{{item.discount}}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 游戏介绍 -->
      <div class="game-introduce-contianer">
        <div class="title">游戏介绍</div>
        <div class="content" v-html="show_description"></div>
      </div>
    </div>

    <div class="buy">
      <goodfooter :price="price" :name="sku_name" :img="sku_cover"></goodfooter>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

import goodfooter from "./Product/goodfooter.vue";
import { Swipe, SwipeItem, Header } from "mint-ui";
import "../js/jquery-3.3.1.js";
import "../css/product.css";

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  data() {
    return {
      gamedata: {},
      gameprice: [],
      show_description: "",
      activation: "",
      summary: "",
      sku_name: "",
      sku_ename: "",
			sku_cover:"",
      list_price: "",
      ifselect: false,
      selected: false,
      price:0
    };
  },
  updated() {
    $(".game-introduce-contianer .content")
      .find("img")
      .css("width", "100%");
  },
  watch:{
  	$route(){
  		let { product_id } = this.$route.params;
  		if (product_id) {
  			let url = "/products/" + product_id + ".json";
	    	this.getData(url);
  		}
  	}
  },
  created() {
  	this.$store.state.isShowTagger=false;
    let { product_id } = this.$route.params;
    let url = "/products/" + product_id + ".json";
    this.getData(url);
  },
  components: {
    goodfooter
  },
  methods: {
    selectMore() {
      this.ifselect = !this.ifselect;
    },
    gotoHome() {
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
          locale: "js",
          sonkwo_version: 1,
          sonkwo_client: "mobile",
          _: 1552994319403
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
        this.gamedata = result.data;
        this.summary = this.gamedata.introduce.summary;
        this.sku_name = this.gamedata.skus[0].sku_name;
        this.sku_ename = this.gamedata.skus[0].sku_ename;
        this.list_price = this.gamedata.skus[0].list_price;
        this.activation = this.gamedata.activation;
        this.show_description = this.gamedata.introduce.show_description;
				this.sku_cover=this.gamedata.snapshots[0].url;//获取图片路径
        let arr = [];
        arr = this.gamedata.developer_skus.map(function(index) {
          return index.id;
        });
        this.getPrice(arr);
      });
    },
    async getPrice(arr) {
      let url = "/api/skus.json";
      await this.$axios(url, {
        params: {
          locale: "js",
          sonkwo_version: 1,
          sonkwo_client: "mobile",
          "q[id_in]": arr
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
        let { id } = this.$route.query;
        this.gameprice = result.data;
        this.price = this.gameprice[0].sale_price;
//      console.log(this.price)
        let gamedata = this.gamedata;
        let game = this.gamedata.developer_skus;
        for (var i = 0; i < game.length; i++) {
          for (var j = 0; j < this.gameprice.length; j++) {
            if (this.gameprice[j].id == game[i].id) {
              game[i].price = this.gameprice[j].sale_price;
              let disc =
                (game[i].list_price - this.gameprice[j].sale_price) /
                game[i].list_price;
              game[i].discount = parseInt(disc * 100);
              break;
            }
            if (game[i].id == id) {
              gamedata.price = game[i].price;
              gamedata.discount = game[i].discount;
            }
          }
        }
        this.$forceUpdate();
      });
    }
  }
};
</script>
<style scoped>
.aboutgame {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
