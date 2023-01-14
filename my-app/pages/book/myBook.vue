<template>
	<view class="my-book">
	<view v-if="bookList.length==0" class="none-box">
		<view class="none">
			<image src="../../static/imgs/none.png" mode="widthFix"></image>
		<view class="content">暂无预约</view>
		</view>
	</view>
<view v-else>
	<view class="item" v-for="item in bookList" :key="item.id">
		<uni-card :title="item.bankName">
			<view class="uni-body">预约业务：{{item.businessName}}</view>
			<view class="uni-body">预约时间：
			<uni-dateformat :date="item.appointmentTime" format="yyyy/MM/dd hh:mm:ss"></uni-dateformat>
			</view>
			<view class="update" @click="goBookDetail(item)">
				修改预约时间
			</view>
			<view class="delete" @click="deleteBook(item.id)">
				删除预约
			</view>
		</uni-card>
	</view>
</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bookList:[]
			}
		},
		onLoad(){
			this.getBookList()
		},
		methods:{
			getBookList(){
				uni.request({
					url:'http://localhost:8082/book/getAppointmentByUsername',
					method:'POST',
					data:{
						userName:uni.getStorageSync('userName')
					},
					timeout:3000,
					success: (res) => {
						console.log('res',res);
						if(res.data.code == 200){
							this.bookList=res.data.data
						}
					}
				})
			},
			goBookDetail(data){
				uni.navigateTo({
					url:`/pages/book/updateBook?data=${JSON.stringify(data)}`
				})
			},
			deleteBook(id){
							uni.showModal({
									title: '提示',
									content: '确定要删除此次预约吗？',
									success: function (res) {
										if (res.confirm) {
											uni.request({
												url:`http://localhost:8082/book/remove/${id}`,
												method:'DELETE',
												timeout:3000,
												success: (res) => {
													console.log('res',res);
													if(res.data.code == 200){
														uni.showToast({
															title:'删除成功！',
															duration:2000
														})
														setTimeout(() =>{
															uni.switchTab({
																url:'/pages/my/my'
															})
														},1000)
													}
												}
											})
											
										} else if (res.cancel) {
											console.log('删除取消');
										}
									}
								})
			}
		}
	}
</script>

<style scoped lang="less">
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
	.delete{
		color:#a98cff;
		float: right;
		margin: 5px 0;
	}
	.update{
		color:#edae30;
		float: left;
		margin: 5px 0;
	}
</style>