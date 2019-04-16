<template>
	<div style="background-color: white;">
		<mt-header title="彬果校区" class="header-black">
			<div slot="left">
				<mt-button icon="back" @click.native="back"></mt-button>
			</div>
			<mt-button icon="search" slot="right"></mt-button>
		</mt-header>

		<mt-navbar v-model="selected" style="width: 100px;margin:0 auto;">
			<mt-tab-item id="1" class="com-nav">果帖</mt-tab-item>
			<mt-tab-item id="2" class="com-nav">小组</mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<!--果帖-->
				<comnavgt></comnavgt>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<!--小组-->
				<comnavgp></comnavgp>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import { Header } from "mint-ui";
	import { Navbar, TabItem } from 'mint-ui';
	import comnavgt from "./community/com-nav-gt.vue";
	import comnavgp from "./community/com-nav-gp.vue";
	export default {
		data() {
			return {
//				isShow: true,//用v-if实现keep-alive下的果帖和小组组件销毁
				selected: '1'
			}
		},
		methods: {
//			tag(idx) {//用v-if实现keep-alive下的果帖和小组组件销毁的逻辑判断
//				if(idx == 2) {
//					this.isShow = false;
//				} else {
//					this.isShow = true;
//				}
//			},
			back() {
				//触发store里的back函数
				this.$store.commit('storeBack',this);
			}
		},
		components: {
			Header,
			Navbar,
			TabItem,
			comnavgt,
			comnavgp
		}
	}
</script>

<style scoped="scoped">
	.header-black {
		background: #333333;
	}
	
	.com-nav {
		font-size: 12px !important;
	}
	
	.is-selected {
		color: orangered !important;
		border-color: orange !important;
	}
</style>