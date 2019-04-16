<template>
  <div>
    <mt-tabbar v-model="selected" class="bottom" fixed>
      <mt-tab-item
        class="bitem"
        :class="{active:idx===active}"
        v-for="(nav,idx) in navs"
        :id="nav.name"
        @click.native="goto(nav,idx)"
        :key="nav.name"
      >
        <i :class="nav.icon"></i>
        <div>{{nav.text}}</div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
export default {
  created() {
		let currentName = this.$router.history.current.name;
		//判断当前导航下标,修改为对应的样式指引
		let currentItem = this.navs.filter((item,idx) => {
			return item.name === currentName
			});
		let idx = this.navs.indexOf(currentItem[0]);
		// console.log('导航',idx)
    this.active = (idx==-1? 4:idx);
  },
  data() {
    return {
      active: 0,
      selected: false,
			id:0,
      navs: [
        {
          text: "商城",
          name: "Home",
          icon: "el-icon-goods"
        },
        {
          text: "头条",
          name: "Headlines",
          icon: "el-icon-document"
        },
        {
          text: "社区",
          name: "Community",
          icon: "el-icon-message"
        },
        {
          text: "购物车",
          name: "Cart",
          icon: "el-icon-menu"
        },
        {
          text: "我的",
          name: "MyPerson",
          icon: "el-icon-setting"
        }
      ]
    };
  },
  methods: {
    goto(nav, idx) {//点击导航菜单
      this.$router.push({ name: nav.name });
      this.active = idx;
      //阻止利用keep-alive实现Community组件复用（组件没有销毁）引起的请求发送
      this.$store.state.loading=true;
      if (nav.name=='Community') {
      	this.$store.state.loading=false;
      }
    }
  }
};
</script>
<style scoped>
.bottom {
  height: 47px;
  display: flex;
  flex: 1;
  align-content: center;
  justify-content: space-around;
  background: #333;
}
.bitem {
  color: #fff;
}
.mint-tabbar > .mint-tab-item.is-selected,
.active {
  color: #ff5722;
  background: #333;
}
</style>
