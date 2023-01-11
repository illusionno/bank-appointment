<template>
	<view class="content">
		<view class="item">
			用户名：{{userInfo.userName}}
		</view>
		<view class="item">
			姓名：{{userInfo.name}}
		</view>
		<view class="item">
			手机号：{{userInfo.phone}}
		</view>
		<view class="item">
			证件类型：{{userInfo.certificatesType ==1?'身份证':'其他证件'}}
		</view>
		<view class="item">
			证件号：{{userInfo.certificatesNo}}
		</view>
		<view class="item">
		<view >
			创建时间：
		</view>			
		<uni-dateformat :date="userInfo.createTime" format="yyyy/MM/dd hh:mm:ss"></uni-dateformat>
		</view>
		<view class="item">
		<view >
			更新时间：
		</view>			
		<uni-dateformat :date="userInfo.updateTime" format="yyyy/MM/dd hh:mm:ss"></uni-dateformat>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userInfo:[]
			}
		},
		onLoad(options) {
			this.userInfo = JSON.parse(options.data)
			console.log('11',this.userInfo);
		},
	}
</script>

<style scoped lang="less">
	.content{
		padding:7px;
		.item {
			background-color: beige;
			margin-bottom: 10px;
			padding: 10px;
			border-radius: 8px;
			.time{
				margin-bottom: 5px;
			}
		}
	}
</style>