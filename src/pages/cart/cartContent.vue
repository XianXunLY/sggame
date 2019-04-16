<template>
	<div class="rangeTittle">
		<p class="rangeContent">购物车空空如也</p>
		<div class="rangeLink">
			<a href="#">看看游戏</a>
			<a href="#">看看周边</a>
		</div>
	</div>
</template>

<script>
	import { Navbar, TabItem } from 'mint-ui';
	export default {
		data() {
			return {
			}
		},
		components: {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.rangeContent{
		margin-top: 200px;
		text-align: center;
	}
	.rangeLink{
		text-align: center;
	}
	.rangeLink a{
		font-size: 14px;
		text-decoration: none;
		color: #0e90d2;
		margin: 0 10px;
	}
</style>