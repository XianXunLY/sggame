<template>
  <div class="recommend">
    <div class="recommend_title">
      <div class="head">{{tuijiandata.name}}</div>
    </div>
    <div class="sk-touch-group">
      <div ref="lunbo" class="lunbo">
        <div class="store-item-card-container" v-for="item in tuijian.items" :key="item.id">
          <div class="card-img">
            <img :src="item.cover" alt>
          </div>
          <div class="card-content">
            <div class="title">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "mint-ui";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  props: ["tuijian"],
  created() {
    this.tuijiandata = this.tuijian;
  },
  data() {
    return {
      tuijiandata: {}
    };
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.recommend {
  margin-top: 0.572082rem;
  width: 100%;
  height: 8.695652rem;
  background: #fff;
}
.recommend_title {
  width: 100%;
  height: 2.345538rem;
  padding: 0.48627rem 0.726545rem;
}
.head {
  color: #333;
  font-size: 0.858124rem;
  font-weight: bold;
}
.sk-touch-group {
  height: 6.17849rem;
  width: 100%;
  overflow: hidden;
  /* position: relative; */
}

.re_img {
  height: 6.121281rem !important;
  width: 8.009153rem !important;
  background: red;
  text-align: center;
}
.lunbo {
  height: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}
.store-item-card-container:first-child {
  margin-left: 0.9375rem;
}
.store-item-card-container {
  margin: 0rem 0rem 0.9375rem 0.625rem;
  width: 9.375rem;
}
.store-item-card-container .card-img {
  width: 7.265446rem;
  height: 4.290618rem;
  position: relative;
}
.store-item-card-container .card-img img {
  width: 100%;
  height: 100%;
}
.store-item-card-container .card-content {
  display: flex;
  flex-direction: column;
}
.store-item-card-container .card-content .title {
  width: 100%;
  font-size: 0.686499rem;
  line-height: 1.125rem;
  margin-top: 0.3125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
}
</style>