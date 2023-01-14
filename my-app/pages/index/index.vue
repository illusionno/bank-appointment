<template>
	<view class="index">
		<!-- banner -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" interval="3000" duration="800">
				<view class="swiper-item" v-for="(item,index) in banner" :key="index" @click="goBook">
					<swiper-item >
						<image :src="item" mode="widthFix" ></image>
					</swiper-item>
				</view>
			</swiper>
		</view>
		<!-- bank -->
		<uni-section title="全部银行" type="line">
			<view v-for="(item,index) in bank" :key="index">
				<uni-card :title="item.bankName" extra="详细信息" @click="getBankDetail(item.bankName)">
					<text class="uni-body">{{item.address}}</text>
				</uni-card>
			</view>
		</uni-section>
		<!--  业务-->
		<uni-section title="银行业务" type="line">
			<uni-list >
			<block v-for="(item,index) in business" :key="index">
				<uni-list-item :title="item" clickable  @click="businessChange(item)" >
				</uni-list-item>
			</block>
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
	// const banner = [
	// 	"../../static/imgs/banner/b1.png",
	// 	"../../static/imgs/banner/b2.png",
	// 	"../../static/imgs/banner/b3.png",
	// 	"../../static/imgs/banner/b4.png",
	// ]
	const banner = [
		require('../../static/imgs/banner/b1.png'),
		require('../../static/imgs/banner/b2.png'),
		require('../../static/imgs/banner/b3.png'),
		require('../../static/imgs/banner/b4.png'),
	]
	
	export default {
		data() {
			return {
				banner,
				bank: [],
				business:[],
				bankName:''
			}
		},
		onLoad() {
			this.getBankInfo()
			this.getAllBusiness()
		},
		methods: {
			getBankInfo() {
				uni.request({
					url: 'http://localhost:8082/system/bank/1/20',
					method: 'GET',
					timeout: 3000,
					success: (res) => {
						console.log('bank=', res.data);
						if (res.data.code === 200) {
							this.bank = res.data.data.records
						}
					}
				})
			},
			getBankDetail(data) {
				uni.navigateTo({
					url: `/pages/bank/bankDetail?bankName=${data}`,

				})
			},
			// 所有业务 (获取可预约银行)
			getAllBusiness() {
				uni.request({
					url: 'http://localhost:8082/system/bank/getAllBank/true',
					method: 'GET',
					timeout: 3000,
					success: (res) => {
						if (res.data.code === 200) {
							this.business = res.data.data
						}
					}
				})
			},
			// 点击业务
			businessChange(val){
				uni.request({
					url: 'http://localhost:8082/refundInfo/getAllRefunds',
					method: 'POST',
					data:{
						"bankName":val
					},
					timeout: 3000,
					success: (res) => {
						if (res.data.code === 200) {
							uni.navigateTo({
								url: `/pages/business/business?data=${JSON.stringify(res.data.data.data)}&bankName=${val}`,
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
	.index {

		// margin: 15upx;
		.uni-margin-wrap {
			width: 690rpx;
			width: 100%;
		}

		.swiper {
			height: 300rpx;
		}
		.my-icon{
			height: 25px;
			width: 25px;
		}
	}
</style>
