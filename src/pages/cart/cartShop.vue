<template>
	<div>
		<ul class="cartul" v-if="$store.state.cartList.length">
			<li class="cartli" v-for="(cart,idx) in $store.state.cartList" @click="select(idx)" :key="idx">
				<label><input type="checkbox" v-model="selected" :value="idx" class="cartInput"/></label>
				<img :src="cart.sku.sku_cover" />
				<div class="">
					<p class="p1">{{cart.sku.sku_name}}</p>
					<p class="p2">￥：<span>{{cart.sku.sale_price}}</span></p>
				</div>
			</li>
		</ul>
		<cartcontent v-if="!$store.state.cartList.length"></cartcontent>
		<div class="cartfooter">
			<div class="settle">
				<input type="checkbox" v-model="checkAll" style="margin: 0 10px;" />全选
				<span v-if="!changeIdx">总计：￥{{this.total.toFixed(2)}}</span>
				<el-button :type="btnType" style="float: right;" @click.native="cartHandle">{{cart_handle}}{{selected.length?selected.length:""}}</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import cartcontent from "./cartContent.vue";
	import qs from "qs";
	export default {
		props: ["cart_handle", "changeIdx"],
		data() {
			return {
				total: 0,
				selected: [],
				btnType: 'info', //结算时变warning
				num: 1 //选中数量
			}
		},
		computed: {
			checkAll: {
				get() {
					//返回当前结果的值
					return this.$store.state.cartList.every((item, idx) => this.selected.includes(idx))
				},
				set(checked) { //参数为当前按钮是否选中的布尔值
					//修改当前checkout的值时触发,即点击全选按钮时触发
					this.selected = checked ? this.$store.state.cartList.map((item, idx) => idx) : [];
					let price = 0;
					for(let j = 0; j < this.selected.length; j++) {
						price += this.$store.state.cartList[this.selected[j]].sku.sale_price * 1;
					}
					this.total = price;
					if(this.total > 0) {
						this.btnType = 'warning';
					} else {
						this.btnType = 'info';
					}
				}
			}
		},
		components: {
			cartcontent
		},
		methods: {
			select(idx) {
				// 获取idx在数组中的位置
				let index = this.selected.indexOf(idx);
				if(index >= 0) {
					// 如果当前已勾选，则取消勾选
					this.selected.splice(index, 1);
				} else {
					this.selected.push(idx);
				}
				let price = 0;
				for(let j = 0; j < this.selected.length; j++) {
					price += this.$store.state.cartList[this.selected[j]].sku.sale_price * 1;
				}
				this.total = price;
				if(this.total > 0) {
					this.btnType = 'warning';
				} else {
					this.btnType = 'info';
				}
			},
			cartHandle() {
				//分两种情况
				if(this.changeIdx) { //删除
					console.log('删除')
					for(let j = 0; j < this.selected.length; j++) {
						console.log(this.selected[j])
						this.$store.state.cartList.splice(this.selected[j] * 1, 1);
					}
					//更新selected数组
					this.selected = [];
					//更新价格
					this.total = 0;
					this.btnType = 'info';
				} else { //结算

				}
			}
		},
		updated(){
			// console.log(this.$store.state.cartList);
		},
		created() {
			//查找是否登录
			let username = localStorage.getItem('username');
			if(username) { //登录
				this.$axios.get('/local/cart/shop', qs.stringify({
					username
				}, {
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					}
				}, {
					withCredentials: true
				})).then(res => {
					//把数据存到vuex
					this.$store.commit('updateCartList', res.data.data);
				})
			} else {
				//没登录就跳转登录界面
			}
		}
	}
</script>

<style>
	.cartul{
		overflow: -webkit-paged-y;
		overflow: scrolly;
		padding-bottom: 5.625rem;
	}
	.cartli {
		padding: 15px 0;
		overflow: hidden;
	}
	
	.cartli img {
		vertical-align: middle !important;
		width: 150px;
		height: 90px;
	}
	
	.cartli div {
		display: inline-block;
		height: 90px;
		vertical-align: middle !important;
		position: relative;
	}
	
	.cartli div .p1 {
		margin: 0 0 0 10px;
		display: inline-block;
		width: 7.375rem;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	
	.cartli div .p2 {
		position: absolute;
		bottom: 0;
		color: red;
		font-size: 12px;
		margin: 0 0 0 10px;
	}
	
	.cartInput {
		margin: 0;
		margin-right: 20px;
		vertical-align: middle !important;
	}
	
	.cartfooter {
		right: 0;
		left: 0;
		position: fixed;
		bottom: 47px !important;
	}
	
	.cartfooter .settle {
		/*position: absolute;*/
		border-top: 1px solid #ccc;
		height: 40px;
		width: 100%;
		bottom: 100%;
		line-height: 40px;
		background: white;
		font-size: 12px;
		color: #666;
	}
</style>