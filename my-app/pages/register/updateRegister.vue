<template>
	<view class="content">
		update
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		mounted(){
			console.log('data',this.userInfo);
			uni.request({
				url:'http://localhost:8082/sysUser/getUserInfo',
				method:'POST',
				data:{
					 "userName":'zq'
				},
				timeout: 3000,
				success:(res) =>{
					console.log('A',res);
				}
			})
		}
	}
	
</script>

<style>
</style>