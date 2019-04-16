<template>
	<div class="zdh">
		<div>
			<el-row>
				<el-col :span="24">
					<el-row type="flex" class="row-bg" justify="center">
						<el-col :span="8">
							<div @click="info" class="grid-content bg-purple grid-content-top">
								<img src="../assets/1.jpg" alt>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple-light top-center">
								<span class="tl1">{{uname}}</span>
								<span class="tl2">普通玩家</span>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="grid-content bg-purple">
								<el-button type="text">个人主页</el-button>
								<el-button class="btnqd" size="mini" round disabled>已签到</el-button>
							</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg row-bg-bottom" justify="space-around">
				<el-col :span="6">
					<div class="grid-content bg-purple">积分：∞</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple-light">果币：∞</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-white xxzx">
						<div class="xxzxx">
							<div>消息中心</div>
						</div>
						<span>果友互动，降价促销</span>
						<span class="el-icon-arrow-right"></span>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-white xxzx">
						<div class="xxzxx">
							<div>点评</div>
						</div>
						<span></span>
						<span class="el-icon-arrow-right"></span>
					</div>
				</el-col>
			</el-row>
			<div class="wybzd">
				<el-row>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<i class="el-icon-edit"></i>
							<span>订单</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">
							<i class="el-icon-tickets"></i>
							<span>激活码</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<i class="el-icon-sold-out"></i>
							<span>心愿单</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">
							<i class="el-icon-more"></i>
							<span>优惠券</span>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<i class="el-icon-star-on"></i>
							<span>收藏</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">
							<i class="el-icon-edit-outline"></i>
							<span>果帖</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<i class="el-icon-news"></i>
							<span>小组</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">
							<i class="el-icon-menu"></i>
							<span>游戏</span>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="6">
						<div @click="info" class="grid-content bg-purple">
							<i class="el-icon-news"></i>
							<span>基本信息</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">
							<i class="el-icon-goods"></i>
							<span>账号安全</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<i class="el-icon-share"></i>
							<span>好友邀请</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">
							<i class="el-icon-location"></i>
							<span>收货地址</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple-light">
							<i class="el-icon-message"></i>
							<span>钱包</span>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	import qs from "qs";
	export default {
		data() {
			return {
				uname: ""
			};
		},
		methods: {
			info() {
				this.$router.push("/info");
			},
			checkToken() {
				let _this = this;
				this.uname = localStorage.getItem("username");
				if(this.uname) {
					_this.$router.push("/myperson");
				} else {
					_this.$router.push("/login");
				}
			}
		},
		created() {
			this.checkToken();
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
	};
</script>
<style scoped>
	.ltop>.el-col {
		padding: 2rem 1rem 2rem 1rem;
	}
	
	.el-col {
		color: white;
	}
	
	.el-col>div {
		height: 100%;
	}
	
	.bg-purple-dark,
	.btnqd {
		background: #333;
	}
	
	.bg-purple {
		background: #333;
	}
	
	.bg-purple-light {
		background: #333;
	}
	
	.bg-purple-white {
		background: #fff;
	}
	
	.grid-content {
		min-height: 36px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	
	.row-bg {
		padding: 10px 0;
		background-color: #333;
	}
	
	.grid-content>img {
		border-radius: 50%;
		height: 3rem;
	}
	
	.grid-content-top {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.row-bg-bottom>.el-col {
		min-height: 0.25rem;
		font-size: 14px;
	}
	
	.top-center {
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
	}
	
	.tl1 {
		font-size: 18px;
	}
	
	.tl2 {
		font-size: 14px;
		color: rgb(204, 197, 197);
	}
	
	.xxzx {
		border-bottom: solid 0.0625rem #f5f5f5;
		display: flex;
		align-items: center;
		flex-direction: row;
		padding: 0rem 0.9375rem;
		font-size: 0.95rem;
		color: #999;
	}
	
	.xxzxx {
		display: flex;
		flex: 1;
		color: black;
	}
	
	.wybzd {
		width: 100%;
		height: auto;
		background-color: white;
		padding-bottom: 2.875rem;
		display: inline-block;
		margin-top: 0.625rem;
	}
	
	.wybzd .el-col div {
		min-height: 6.25rem;
		background: white;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	
	.wybzd .el-col div i {
		font-size: 1.85rem;
		color: deepskyblue;
	}
	
	.wybzd .el-col div span {
		font-size: 0.9375rem;
		color: #333333;
		line-height: 1.3125rem;
		padding-top: 0.625rem;
	}
	
	.zdh {
		flex: 1;
		overflow-x: hidden;
		overflow-y: auto;
		background-color: #f5f5f5;
	}
</style>