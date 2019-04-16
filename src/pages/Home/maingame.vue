<template>
  <div class="maingame">
    <div class="game" v-for="item in game" :key="item.id" @click="gotoList(item)">
      <div class="game_img">
        <img :src="item.sku_cover">
      </div>
      <div class="game_item">
        <div class="game_item_title">
          <span>
            <!-- <span class="inter">国际站</span> -->
            {{item.sku_name}}
          </span>
        </div>
        <div class="game_item_view">
          <div class="span"></div>
          <div class="summary" v-if="item.product">
            <div v-for="product in item.product.searchable_tags" :key="product.id">{{product.name}}</div>
          </div>
          <div class="game_item_price" v-if="item.list_price">
            <div class="price">￥{{item.list_price}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      game: {}
    };
  },
  props: ["q"],
  methods: {
    gotoList(item) {
    	this.$store.state.isShowTagger=false;
      this.$router.push({
        name: "Product",
        params: { product_id: item.product_id },
        query: { id: item.id }
      });
    },
    async getData() {
      let url = "/api/v5/home.json";
      await this.$axios(url, {
        params: {
          locale: "js",
          sonkwo_version: 1,
          sonkwo_client: "mobile",
          q: [this.q]
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
        let q = this.q;
        // let arr = [];

        this.game = result.data[q];
        // arr = this.game.map(function(index) {
        //   return index.id;
        // });
        // console.log("game", this.game);
        // this.getPrice(arr);
      });
    }
    // async getPrice(arr) {
    //   let url = "/api";
    //   await this.$axios(url, {
    //     params: {
    //       locale: "js",
    //       sonkwo_version: 1,
    //       sonkwo_client: "mobile",
    //       type: "simple",
    //       "q[id_in]": arr
    //     },
    //     headers: {
    //       Accept: "application/vnd.sonkwo.v5+json",
    //       "Content-Type": "application/json; charset=utf-8",
    //       "Cache-Control": "max-age=0, private, must-revalidate",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "GET",
    //       "Access-Control-Allow-Headers": "x-requested-with,content-type"
    //     }
    //   }).then(result => {
    //     console.log("price", result);
    //   });
    // }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.maingame {
  background: #fff;
}
.game {
  width: 100%;
  height: 5.720824rem;
  padding: 0.743707rem 0.343249rem 0.743707rem 0.800915rem;
  border-bottom: 0.048627rem solid #f5f5f5;
  display: flex;
  position: relative;
}
.game_img {
  width: 7.322654rem;
  height: 4.347826rem;
}
.game_img img {
  width: 100%;
  height: 100%;
}
.game_item {
  width: 9.153318rem;
  height: 4.347826rem;
  margin-left: 0.686499rem;
  display: flex;
  flex-direction: column;
}
.game_item {
  font-size: 0.686499rem;
  color: #333;
  display: flex;
  flex-wrap: wrap;
  line-height: 0.915332rem;
}
.game_item .inter {
  background: #106dde;
}
.sale-content {
  color: #fff;
  border-radius: 0.0625rem;
  font-size: 0.514874rem;
  padding: 0 0.143021rem;
  margin-right: 0.286041rem;
}
.game_item_view {
  width: 100%;
  height: 3.375286rem;
}
.game_item_view .span {
  width: 100%;
  height: 0.858124rem;
}
.summary {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.686499rem;
}
.summary div {
  background: #f5f5f5;
  color: #666;
  font-size: 0.549199rem;
  border-radius: 0.125rem;
  margin-right: 0.3125rem;
  overflow: hidden;
  text-align: center;
  max-width: 3.75rem;
  text-overflow: ellipsis;
  /* margin-bottom: 0.1875rem; */
}
.game_item_price {
  display: flex;
  flex: 1;
  width: 100%;
  height: 0.686499rem;
}
.game_item_price .price {
  font-size: 0.686499rem;
  color: #ff5722;
}
</style>