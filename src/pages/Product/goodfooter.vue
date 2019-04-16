<template>
	<div class="good">
		<div class="goods-footer">
			<div class="goods-item g-i-l" @click="gotoCart">购物车</div>
			<div class="goods-item g-i-l">收藏</div>
			<div class="goods-item g-i-b" style="background: #ff9800;" @click="updateCart">加入购物车</div>
			<div class="goods-item g-i-b" style="background: #ff5722;">立即购买</div>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	export default {
		props: ["price", "name","img"],
		data() {
			return {
				goodsInfo:{}
			}
		},
		created() {
			this.$store.state.isShowTagger = false;
		},
		methods: {
			gotoCart() {
				this.$store.state.isShowTagger = true;
				this.$router.push({
					name: "Cart"
				});
			},
			updateCart() {
				//判断是否登录
				let username = localStorage.getItem('username');
				if(username) { //登录
					//获取数据构造购物车的订单信息
					let order = {
						hoster:username,
						price:this.price,
						quantity:1,
						sku:{
							sku_cover:this.img,
							sku_name:this.name,
							sale_price:this.price
						}
					}
					//修改store中的cartList，自动渲染
					this.$store.commit('addCartList', order);
					//修改数据库
					Toast({
						message: '加入成功',
						iconClass: 'icon icon-success',
						duration: 1000
					});
					
				} else {
					this.$router.push({
						name: "Login"
					})
				}
			},
			async getDate() {
				let {data} = await this.$axios('/cart/update',{
					params:{
						good_name:this.name,
						
					}
				})
			}
		}
	};
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	.good {
		height: 2.574371rem;
		width: 100%;
	}
	
	.goods-footer {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		background: #fff;
		border-top: 0.0625rem solid #cccccc;
		/* justify-content: center; */
	}
	
	.goods-item {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.g-i-l {
		flex: 1;
		font-size: 0.549199rem;
		color: #666;
		border-left: 0.0625rem solid #cccccc;
	}
	
	.g-i-b {
		flex: 2;
		font-size: 0.800915rem;
		color: #fff;
	}
</style>