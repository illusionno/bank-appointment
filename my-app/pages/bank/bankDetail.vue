<template>
	<view class="bank">
		<view class="item">
			银行名称：{{bankDetail.bankName}}
		</view>
		<view class="item">
			银行编号：{{bankDetail.bankCode}}
		</view>
		<view class="item">
			银行地址：{{bankDetail.address}}
		</view>
		<view class="item">
			联系人：{{bankDetail.contactsName}}
		</view>
		<view class="item">
			联系人电话：{{bankDetail.contactsPhone}}
		</view>
		<view class="item">
			银行状态：{{bankDetail.status==0?'可预约':'不能预约'}}
		</view>
		<view class="item">
<view class="time">
	银行信息更新时间：
</view>			
<uni-dateformat :date="bankDetail.updateTime" format="yyyy/MM/dd hh:mm:ss"></uni-dateformat>
		</view>
	<view class="my-btn">
		<view class="link" @click="goBusiness">
			查看该银行下的业务
		</view>
		<view class="link2" @click="goBook">
			去预约
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankDetail: []
			}
		},
		onLoad(options) {
			this.getBankDetail(options.bankName)
		},
		methods:{
			getBankDetail(bankName){
				uni.request({
					url: 'http://localhost:8082/system/bank/1/20',
					data:{
						bankName
					},
					method: 'GET',
					timeout: 3000,
					success: (res) => {
						if (res.data.code === 200) {
							this.bankDetail = res.data.data.records[0]
						}
					}
				})
			},
			goBusiness(){
				uni.request({
					url: 'http://localhost:8082/refundInfo/getAllRefunds',
					method: 'POST',
					data:{
						"bankName":this.bankDetail.bankName
					},
					timeout: 3000,
					success: (res) => {
						if (res.data.code === 200) {
							uni.navigateTo({
								url: `/pages/business/business?data=${JSON.stringify(res.data.data.data)}&bankName=${this.bankDetail.bankName}`,
							})
						}
					}
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

<style lang="less" scoped>
	.bank {
		padding: 15px;

		.item {
			background-color: beige;
			margin-bottom: 10px;
			padding: 10px;
			border-radius: 8px;
			.time{
				margin-bottom: 5px;
			}
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
