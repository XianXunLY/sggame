<template>
	<div>
		<mt-header title="购物车" class="header-black">
			<div slot="left" >
				<mt-button icon="back" @click.native="back"></mt-button>
			</div>
			<mt-button slot="right" @click.native="changeHandle">{{handle}}</mt-button>
		</mt-header>
		
		<mt-navbar v-model="selected" class="header-black">
			<mt-tab-item id="1" class="com-nav" style="color: white;">彬果购</mt-tab-item>
			<mt-tab-item id="2" class="com-nav" style="color: white;">周边</mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<!--彬果购-->
				<cartshop :cart_handle="cart_handle" :changeIdx="changeIdx"></cartshop>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<!--周边-->
				<cartcontent></cartcontent>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import { Header } from "mint-ui";
	import { Navbar, TabItem } from 'mint-ui';
	import cartcontent from "./cart/cartContent.vue";
	import cartshop from "./cart/cartShop.vue";
	export default {
		data() {
			return {
				selected:'1',
				handle:'编辑',
				changeIdx:false,
				cart_handle:"去结算"
			}
		},
		components: {
			Header,
			Navbar,
			TabItem,
			cartshop,
			cartcontent
		},
		methods:{
			changeHandle(){
				this.handle=this.changeIdx?'编辑':"完成";
				this.cart_handle=this.changeIdx?'去结算':"删除";
				this.changeIdx=!this.changeIdx;
			},
			back(){
				//触发store里的back函数
				this.$store.commit('storeBack', this);
			}
		}
	}
</script>

<style scoped>
	.header-black {
		background: #333333;
	}
	
	.com-nav {
		font-size: 16px !important;
	}
	
	.is-selected {
		color: orangered !important;
		border-color: orange !important;
	}
</style>