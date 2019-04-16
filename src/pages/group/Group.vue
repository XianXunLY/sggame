<template>
	<div>
		<mt-header title="小组页" class="header-black">
			<div slot="left">
				<mt-button icon="back" @click.native="back"></mt-button>
			</div>
			<mt-button icon="more" slot="right"></mt-button>
		</mt-header>
		<div class="groupInfo">
			<div class="groupGame">
				<div class="left">
					<img class="groupLogo" :src="groupInfo.logo" />
				</div>
				<div class="right">
					<h4>{{groupInfo.description}}</h4>
					<p>
						<span><i class="el-icon-bell"></i> {{groupInfo.member_count}}</span>
						<span><i class="el-icon-tickets"></i> {{groupInfo.subject_count}}</span>
					</p>
					<h5 style="margin: 0;">组长：<img class="leaderimg" 
						:src="leaderImg"
						/><span style="font-size: 10px;">{{leader}}</span></h5>
				</div>
			</div>
			<div>
				<el-button style="width:40%;">游戏详情</el-button>
				<el-button style="background:#ff5722;width:55%;">关注小组</el-button>
			</div>

			<div class="groupLink">
				<mt-navbar v-model="selected">
					<mt-tab-item id="1">果帖</mt-tab-item>
					<mt-tab-item id="2">点评</mt-tab-item>
					<mt-tab-item id="3">成就</mt-tab-item>
					<mt-tab-item id="4">排行</mt-tab-item>
					<mt-tab-item id="5">约战</mt-tab-item>
				</mt-navbar>
				<!-- tab-container -->
				<mt-tab-container v-model="selected">
					<mt-tab-container-item id="1">
						<!--果帖-->
						<div class="noteHeader">
							<!--<button @click= "tag">点击</button>
							<mt-popup :visible.sync="popupVisible">
								<slot>盒子</slot>
							</mt-popup>-->
						</div>
						<div class="noteContent">

						</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="2">
						<!--点评-->
					</mt-tab-container-item>
					<mt-tab-container-item id="3">
						<!--成就-->
					</mt-tab-container-item>
					<mt-tab-container-item id="4">
						<!--排行-->
					</mt-tab-container-item>
					<mt-tab-container-item id="5">
						<!--约战-->
					</mt-tab-container-item>
				</mt-tab-container>
			</div>

		</div>
	</div>
</template>

<script>
	import { Navbar, TabItem } from 'mint-ui';
	import { Popup } from 'mint-ui';
	export default {
		data() {
			return {
				selected: '1',
				popupVisible:true,
				groupInfo:{},
				leader:'',
				leaderImg:''
			}
		},
		components: {
			Popup
		},
		methods: {
			tag(){
				this.popupVisible=!this.popupVisible;
			},
			back() {
				//触发store里的back函数
				this.$store.commit('storeBack',this);
			}
		},
		created(){
			//刷新时隐藏导航菜单
			this.$store.state.isShowTagger=false;
			//请求小组数据
			this.$axios.get('/group/groups/534.json', {
				params: {
					'locale':'js',
					sonkwo_version:1,
					sonkwo_client:'mobile',
					'_':1552999148499
				},
				headers:{
					'Accept': 'application/vnd.sonkwo.v4+json'
				}
			}).then(res => {
				console.log(res.data);
				this.groupInfo =res.data.group;
				this.leaderImg = this.groupInfo.leaders[0].avatar;
				this.leader = this.groupInfo.leaders[0].nickname;
			})
		}
	}
</script>

<style scoped>
	.groupInfo {
		padding: 10px;
		height: 165px;
	}
	
	.groupGame {
		margin-bottom: 5px;
		overflow: hidden;
	}
	
	.groupGame div {
		float: left;
	}
	
	.groupGame .groupLogo {
		width: 150px;
		height: 90px;
	}
	
	.groupGame .right {
		padding: 0 0 0 10px;
		height: 90px;
	}
	
	.groupGame .right h4 {
		margin: 0;
		word-wrap: break-word;
	}
	
	.groupGame .right p {
		margin-top: 25px;
		font-size: 12px;
		color: #666;
	}
	
	.groupGame .right p span {
		margin-right: 5px;
	}
	.leaderimg{
		width: 15px;
		height: 15px;
	}
</style>