<template>
	<div class="content">
		<div class="conheader" @click.stop="tagUser">
			<div style="width: 30px;height: 30px;"><img :src="post.creator.avatar" class="postUserImg" /></div>
			<div style="padding-left: 10px;">
				<p>{{post.creator.nickname}}</p>
				<p style="color: #bbb;">{{post.published_at_timestamp}}</p>
			</div>
		</div>
		<div class="conmain" @click.stop="tagNote">
			<span>{{post.content}}</span>
			<div class="imgbox">
				<!--评价图片-->
				<img :src="img" v-for="(img,idx) in image_urls" v-if="idx<3" :key="idx" />
			</div>
		</div>
		<div class="confooter" @click.stop="tagGroup">
			<div class="confrom">
				<span>来自：<a href="#">{{post.group.name}}</a></span>
			</div>
			<div class="conrefer">
				<!--回复评论-->
				<span><i class="el-icon-edit-outline"></i> {{post.comment_count}}</span>
				<!--点赞-->
				<span @click.stop="addSupport"><i class="el-icon-check"></i> {{post.likes_count}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['post', "image_urls", 'length', 'search'],
		data() {
			return {
				
			}
		},
		computed: {
			postTime(t) {
				return;
			}
		},
		components: {

		},
		methods: {
			
			//跳转当前用户详情
			tagUser() {
				this.$router.push({
					name: 'User'
				})
			},
			//跳转当前帖子详情
			tagNote() {
				return 0;
			},
			//跳转当前小组详情
			tagGroup() {
				return 0;
			},
			//点赞
			addSupport() {
				return 0;
			}
		},
		mounted() {}
	}
</script>

<style scoped>
	.content {
		padding: 15px;
	}
	
	.conheader div {
		display: inline-block;
	}
	
	.postUserImg {
		width: 30px;
		height: 30px;
	}
	
	.conheader div p {
		margin: 0;
		font-size: 12px;
	}
	
	.conmain {
		width: 100%;
	}
	
	.conmain span {
		font-size: 14px;
	}
	
	.conmain .imgbox {
		display: flex;
		justify-content: space-between;
	}
	/*图片大小*/
	
	.conmain .imgbox img {
		height: 100px;
		width: 33%;
	}
	
	.confooter {
		display: flex;
		justify-content: space-between;
		margin-top: 5px;
	}
	
	.confooter .confrom {
		font-size: 12px;
	}
	
	.confooter .confrom a {
		color: #0288d1;
	}
	
	.conrefer span {
		font-size: 10px;
		margin: 0 5px;
	}
</style>