<template>
	<div style="margin-top: 5px;">
		<el-tabs tab-position="left" v-model="index" @tab-click="tagContent(index)">
			<el-tab-pane v-for="(label,index) in labelList" :key="index" :label="label.name" class="rows">
				<ul>
					<li class="gpli" @click.stop="tagGroup" v-for="(content,idx) in contentList" :key="idx">
						<img class="groupimg" :src="content.logo"/>
						<div class="groupgameinfo">
							<p><span>{{content.name}}</span></p>
							<p>
								<span><i class="el-icon-rank"></i>{{content.member_count}}</span>
								<span><i class="el-icon-tickets"></i>{{content.subject_count}}</span>
							</p>
						</div>
					</li>
				</ul>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	//	import { Swipe, SwipeItem } from 'mint-ui';
	import { Navbar, TabItem } from 'mint-ui';
	import { CellSwipe } from 'mint-ui';
	export default {
		data() {
			return {
				selected: '2',
				labelList:[],
				contentList:[],
				index:'0'
			}
		},
		components: {
			Navbar,
			TabItem
		},
		methods:{
			tagGroup(){
				this.$store.state.isShowTagger=false;
				this.$router.push({name:'Group'})
			},
			tagContent(index){
				if (index==='7') {
					this.$axios.get('/api/communities/groups.json', {
						params: {
							'locale':'js',
							sonkwo_version:1,
							sonkwo_client:'mobile',
							"q[tags_id_blank]": true,
							"_": 1552989589191
						},
						headers:{
							'Accept': 'application/vnd.sonkwo.v5+json'
						}
					}).then(res => {
	//					console.log(res.data);
						this.contentList=res.data.groups;
					})
				}else{
					this.$axios.get('/api/communities/groups.json', {
						params: {
							'locale':'js',
							sonkwo_version:1,
							sonkwo_client:'mobile',
							"q[tags_id_eq]": 1696+index*1,
							"_": 1552989589191
						},
						headers:{
							'Accept': 'application/vnd.sonkwo.v5+json'
						}
					}).then(res => {
						this.contentList=res.data.groups;
					})
				}
				
			},
		},
		created(){
			//请求groupname
			this.$axios.get('/api/tags.json', {
				params: {
					'locale':'js',
					sonkwo_version:1,
					sonkwo_client:'mobile',
					"q[kind_eq]": 11,
					"_": 1552989589186
				},
				headers:{
					'Accept': 'application/vnd.sonkwo.v5+json'
				}
			}).then(res => {
//				console.log(res.data);
				this.labelList=res.data;
				this.labelList.push({name:"更多"});
			})
			
			//请求groupcontent
			this.$axios.get('/api/communities/groups.json', {
				params: {
					'locale':'js',
					sonkwo_version:1,
					sonkwo_client:'mobile',
					"q[tags_id_eq]": 1696,
					"_": 1552989589191
				},
				headers:{
					'Accept': 'application/vnd.sonkwo.v5+json'
				}
			}).then(res => {
				this.contentList=res.data.groups;
			})
		}
	}
</script>

<style>
	.el-tabs__item.is-left{
		text-align: center !important;
	}
	ul,li{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.gpli{
		width: 250px;
		height: 46px;
		padding: 10px;
		overflow: hidden;
	}
	.gpli .groupimg{
		width: 75px;
		height: 45px;
		float: left;
	}
	.groupgameinfo{
		float: left;
	}
	.groupgameinfo p{
		margin: 2px 0 0 10px;
	}
	.groupgameinfo span{
		font-size: 12px;
	}
</style>