<template>
	<view class="business">
		<view v-if="businessDetail.length==0" class="none-box">
			<view class="none">
				<image src="../../static/imgs/none.png" mode="widthFix"></image>
			<view class="content">暂无业务</view>
			</view>
		</view>
		<view v-else>
			<view class="bankName">
				<image src="../../static/imgs/business.png" mode="widthFix"></image>
				<text>{{bankName}}的业务：</text>
			</view>
			<block v-for="(item,index) in businessDetail" :key="index">
						<view class="item">
							{{item.businessName}}
						</view>
					</block>
					<view class="my-btn">
						<view class="link" @click="goBank">
							查看该银行信息
						</view>
						<view class="link2" @click="goBook">
							去预约
						</view>
					</view>
		</view>
	

	</view>
</template>

<script>
	export default {
		data(){
			return{
				businessDetail:[],
				bankName:''
			}
			
		},
		onLoad(options) {
			this.businessDetail = JSON.parse(options.data)
			this.bankName = options.bankName
		},
		methods:{
			goBank(){
				uni.navigateTo({
					url: `/pages/bank/bankDetail?bankName=${this.bankName}`,

				})
			},
			goBook(){
				uni.switchTab({
					url:'/pages/book/book'
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.business{
		padding: 7px;
		.none-box{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.none{
				height: 200px;
				width: 200px;
				image{
				width: 100%;
				height: 100%;
				}
				.content{
					text-align: center;
					color: #858585;
				}
			}
			
		}

		.bankName{
			margin-bottom: 10px;
			display: flex;
			align-items: center;
			image{
				width: 25px;
				height: 25px;
			}
		}
		.item {
			background-color: beige;
			margin-bottom: 10px;
			padding: 10px;
			border-radius: 8px;
			}
			.my-btn{
				display: flex;
				justify-content: space-between;
				margin-top: 10px;
				.link{
					color: #218cff;
					padding: 3px 7px;
					border: 1px solid  #218cff;
					display: inline-block;
					border-radius: 8px;
				}
				.link2{
				color: #ffbc34;
					padding: 3px 7px;
					border: 1px solid  #ffbc34;
					display: inline-block;
					border-radius: 8px;
				}
			}
	}
</style>