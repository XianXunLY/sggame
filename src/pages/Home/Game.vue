<template>
  <div class="Game">
    <div class="title">
      <div class="head">{{change_skus.name}}</div>
    </div>
    <div class="change_game">
      <div
        @click="gotoList(item)"
        class="game"
        v-for="(item,index) in change_skus.sample_items"
        v-if="ifshow(index)"
        :key="item.id"
      >
        <div class="cartImg">
          <div class="cart_img">
            <img :src="item.sku_cover" alt>
          </div>
        </div>
        <div class="card-content">
          <div class="cart-title">{{item.sku_name}}</div>
          <div class="price-content">
            ￥{{item.list_price}}
            <div class="discount">-56%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="change">换一换</div>
  </div>
</template>
<script>
export default {
  props: ["change_skus"],
  methods: {
    ifshow(index) {
      return index < 4 ? true : false;
    },
    gotoList(item) {
    	this.$store.state.isShowTagger=false;
      this.$router.push({
        name: "Product",
        params: { product_id: item.product_id },
        query: { id: item.id }
      });
    }
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.Game {
  width: 100%;
  height: 20.1373rem;
  background: #fff;
  margin-top: 0.572082rem;
}
.title {
  width: 100%;
  height: 2.345538rem;
  padding: 0.48627rem 0.726545rem;
}
.head {
  height: 1.372998rem;
  font-size: 0.858124rem;
  font-weight: bold;
}
.change_game {
  width: 100%;
  height: 15.617849rem;
  padding: 0 0.726545rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.game {
  width: 48.7%;
}
.cart_img {
  width: 100%;
  height: 4.8627rem;
}
.cart_img img {
  width: 100%;
  height: 100%;
}
.card-content {
  display: flex;
  flex-direction: column;
}
.cart-title {
  width: 100%;
  font-size: 0.629291rem;
  line-height: 0.858124rem;
  color: #333;
  margin: 0.228833rem;
}
.price-content {
  width: 100%;
  height: 0.858124rem;
  font-size: 0.686499rem;
  margin-top: 0.228833rem;
  color: #ff5722;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
}
.discount {
  border: 0.048627rem solid #ff5722;
  border-radius: 0.125rem;
  height: 0.686499rem;
  font-size: 0.549199rem;
  padding: 0 0.145881rem;
  margin: 0 0 0 0.291762rem;
  line-height: 0.686499rem;
}
.change {
  width: 100%;
  height: 2.139588rem;
  font-size: 0.583524rem;
  color: #999;
  text-align: center;
  line-height: 2.139588rem;
  border-top: 0.057208rem solid #f5f5f5;
}
</style>