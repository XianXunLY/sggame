<template>
  <div class="recommend">
    <div class="recommend_title">
      <div class="head">热门小组</div>
    </div>
    <div class="sk-touch-group">
      <div ref="lunbo" class="lunbo">
        <div class="store-item-card-container" v-for="item in groups" :key="item.id">
          <div class="card-img">
            <img :src="item.logo" alt>
            <div class="group-info-container">
              <div class="info">
                <span class="iconfont icon-xiaozurenshux"></span>
                <span>{{item.member_count}}</span>
                <span class="iconfont icon-xiaozutiezishux"></span>
                <span>{{item.posts_count}}</span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="title">{{item.name}}</div>
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
  props: ["groups"],
  data() {
    return {};
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
.lunbo {
  height: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}
.re_img {
  height: 6.121281rem !important;
  width: 8.009153rem !important;
  background: red;
  text-align: center;
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
.store-item-card-container .card-img .group-info-container {
  width: 100%;
  height: 1.875rem;
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  display: flex;
}
.store-item-card-container .card-img .group-info-container .info {
  display: flex;
  box-orient: horizontal;
  flex-direction: row;
  align-items: flex-end;
  color: white;
  font-size: 0.625rem;
}
.store-item-card-container .card-img .group-info-container .info span {
  padding-left: 0.3125rem;
  font-size: 0.625rem;
}
.store-item-card-container .card-img .group-info-container .info .iconfont {
  font-size: 0.625rem;
  opacity: 0.7;
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