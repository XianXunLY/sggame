<template>
	<div>
		<mt-header title="用户信息" class="header-black">
			<div slot="left" >
				<mt-button icon="back" @click.native="back"></mt-button>
			</div>
		</mt-header>
		<div class="UserImg">
			<img :src="userInfo.avatar"/>
			<div class="useriInfo">
				<div class="userName">
					{{userInfo.nick_name}}<span>vip3</span>
				</div>
				<div class="userLevel">
					普通玩家
				</div>
				<div class="userLink">
					<a href="" @click="follow">关注</a>
					<a href="">私信</a>
				</div>
			</div>
		</div>
		
		<div class="userTip">
			<ul>
				<li><p><span>{{userInfo.subject_count}} <br /></span>果帖</p></li>
				<li><p><span>{{userInfo.following_count}} <br /></span>小组</p></li>
				<li><p><span>{{userInfo.gender}} <br /></span>心愿单</p></li>
				<li><p><span>{{userInfo.collection_count}} <br /></span>收藏</p></li>
			</ul>
		</div>
		
		<div class="userFriend">
			<div class="left">
				这个萌新暂无朋友
			</div>
			<div class="right">
				<p style="margin: 0;"><span>{{userInfo.follower_count}}</span>粉丝</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { Header } from "mint-ui";
	export default {
		data() {
			return {
				selected:'1',
				userInfo:{}
			}
		},
		components: {
			Header
		},
		methods:{
			follow(){
				return true;
			},
			back(){
				//触发store里的back函数
				this.$store.commit('storeBack',this);
			}
		},
		created(){
			this.$axios.get('/api/profile', {
				params: {
					'locale':'js',
					sonkwo_version:1,
					sonkwo_client:'mobile',
					"opts[]": "score",
					"opts[]": "game_info",
					"opts[]": "power",
					"opts[]": "group_count",
					"opts[]": "wish_count",
					"opts[]": "friend_count",
					account_id: 254083,
					_: 1552999148481
				},
				headers:{
					'Accept': 'application/vnd.sonkwo.v5+json'
				}
			}).then(res => {
				console.log(res.data);
				this.userInfo=res.data.info;
			})
		}
	}
</script>

<style scoped>
	.UserImg{
		height: 187px !important;
		background-image: url(../../img/5g.jpg);
		background-size:100% 100%;
		text-align: center;
		color: white;
	}
	.UserImg img{
		width: 52px;
		height: 52px;
		margin: 10px 0 5px 0;
	}
	.userLevel{
		font-size: 12px;
		margin-top: 5px;
	}
	.userLink{
		margin-top: 15px;
	}
	.userLink a{
		color: white;
		display: inline-block;
		width: 60px;
		height: 25px;
		margin: 0 15px;
		text-decoration: none;
		background-color: rgba(0, 0, 0, 0.4);
		font-size: 12px;
		line-height: 25px;
	}
	.followActive{
		background-color: #ff5722;
	}
	.userTip{
		height: 60px;
	}
	ul{
		overflow: hidden;
	}
	.userTip li{
		list-style: none;
		float: left;
		height: 60px;
		width: 25%;
		text-align: center;
		font-size: 12px;
	}
	.userTip li span{
		font-size: 18px;
	}
	.userFriend{
		padding: 22px 0;
		overflow: hidden;
	}
	.userFriend div{
		float: left;
		font-size: 14px;
	}
	.userFriend .left{
		text-align: center;
		width: 240px;
	}
	.userFriend .right{
		margin-left:30px ;
	}
</style>