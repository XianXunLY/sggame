<template>
	<div style="margin-top: 5px;">
		<div>
			<!--轮播图-->
			<mt-swipe :auto="4000" class="lunbobox">
				<mt-swipe-item v-for="(lunbo,idx) in lunboList" class="lunbo" :key="idx">
					<!--图片-->
					<img :src="lunbo.cover" class="luoboimg" />
					<p class="lunboTitle">{{lunbo.title}}</p>
				</mt-swipe-item>
			</mt-swipe>
		</div>

		<div>
			<mt-navbar v-model="selected" style="width: 100px;">
				<mt-tab-item id="1" @click.native="Post(1)">最新</mt-tab-item>
				<mt-tab-item id="2" @click.native="Post(2)">最热</mt-tab-item>
			</mt-navbar>

			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1" v-if="itemIsShow" v-infinite-scroll="loadMore" infinite-scroll-disabled="$store.state.loading" infinite-scroll-distance="10">
					<comments v-for="(posts,idx) in $store.state.postsList" :search="0+''" :length='$store.state.postsList.length' :post="posts" :image_urls="posts.image_urls" :key="idx"></comments>
				</mt-tab-container-item>

				<mt-tab-container-item id="2" v-if="!itemIsShow" v-infinite-scroll="loadMore" infinite-scroll-disabled="$store.state.loading" infinite-scroll-distance="9">
					<comments v-for="(posts,idx) in $store.state.postsList" :search="1+''" :length='$store.state.postsList.length' :post="posts" :image_urls="posts.image_urls" :key="idx"></comments>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	import { Navbar, TabItem } from 'mint-ui';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	import comments from './comments.vue'
	export default {
		data() {
			return {
				selected: '1',
				lunboList: [],
				page: 0,
				itemIsShow: true
			}
		},
		components: {
			Swipe,
			SwipeItem,
			Navbar,
			TabContainerItem,
			comments
		},
		methods: {
			async getData(para={recommend:false,page:1}) {
				let {recommend,page} = para;
				let {
					data
				} = await this.$axios.get('/post/search/posts', {
					params: {
						'locale': 'js',
						sonkwo_version: 1,
						sonkwo_client: 'mobile',
						type: 'Posts::Subject',
						recommend,
						page,
						'order[published_at_timestamp]': 'desc'
					},
					headers: {
						'Accept': 'application/vnd.sonkwo.v6+json'
					}
				});
				let method;
				page==1?method=1:method=0;
				this.$store.commit('updatePostsList', {
					method,
					payload: data.posts
				});
			},
			//懒加载
			loadMore() {
				this.$store.state.loading = true;
				let recommend = false;
				if(this.search == '1') {
					recommend = true;
				}
				this.page++;
				this.getData({recommend,page:this.page});
				this.$store.state.loading = false;
			},

			//点击获取帖子数据
			Post(i) {
				let recommend = false;
				this.page = 1;
				if(i == 2) {
					recommend = true;
					this.itemIsShow = false;
				} else {
					this.itemIsShow = true;
				}
				this.getData({recommend,page:1});
			}
		},
		created() {
			//轮播请求
			this.$axios.get('/api/community_home.json', {
				params: {
					"locale": 'js',
					"sonkwo_version": 1,
					"sonkwo_client": 'mobile',
					'q': ['recommend_guoties']
				},
				headers: {
					'Accept': 'application/vnd.sonkwo.v5+json'
				}
			}).then(res => {
				this.lunboList = res.data.recommend_guoties.banners;
			})
			this.getData();
		}
	}
</script>

<style scoped>
	.is-selected {
		color: orangered !important;
		border-color: orange !important;
	}
	
	.lunbobox {
		height: 185px !important;
	}
	
	.lunbo {
		width: 100%;
	}
	
	.luoboimg {
		width: 100%;
	}
	
	.lunboTitle {
		margin: 0;
		padding: 0 15px;
		height: 20px;
		overflow: hidden;
		font-size: 14px;
	}
</style>