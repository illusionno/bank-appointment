<template>
	<view class="book">
		<uni-forms ref="form" :modelValue="formData" :rules="rules" v-if="isLogin">
			<uni-forms-item name="bankName" label="银行名称" label-width="90">
				<radio-group @change="bankChange">
					<block v-for="(item,index) in allBank" :key="index">
						<label class="radio">
							<radio :value="item" style="transform: scale(0.7)" :checked="reset" />{{item}}
						</label>
					</block>
				</radio-group>
			</uni-forms-item>
			<uni-forms-item name="businessName" label="业务名称" label-width="90">
				<text v-if="allBusiness.length==0">暂无业务</text>
				<radio-group v-else @change="businessChange">
					<block v-for="(item,index) in allBusiness" :key="index">
						<label class="radio">
							<radio style="transform: scale(0.7)" :value="item.businessName" :checked="reset" />
							{{item.businessName}}
						</label>
					</block>
				</radio-group>
			</uni-forms-item>
			<!-- 			<uni-forms-item label="预约人" name="userName" >
			<input v-model="formData.userName" placeholder="请输入预约人" />
			</uni-forms-item> -->
			<uni-forms-item label="预约时间" name="appointmentTime" label-width="90">
				<uni-datetime-picker type="datetime" v-model="formData.appointmentTime" />
			</uni-forms-item>
			<button type="primary" class="primary" @tap="submit">提交</button>
		</uni-forms>
		<view v-else>
			<view>
				您还未登录，先去登录吧～
			</view>
			<view class="btn">
				<text @click="goLogin">去登录</text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				isLogin: uni.getStorageSync('isLogin'),
				allBank: [],
				allBusiness: [],
				reset: '',
				formData: {
					bankName: '',
					businessName: '',
					appointmentTime: '',
				},
				rules: {
					bankName: {
						rules: [{
							required: true,
							errorMessage: '请选择银行名称',
						}]
					},
					businessName: {
						rules: [{
							required: true,
							errorMessage: '请选择业务名',
						}]
					},
					appointmentTime: {
						rules: [{
							required: true,
							errorMessage: '请选择预约时间',
						}]
					},
				}
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		onLoad() {
			this.getAllBank()
		},
		methods: {
			// 获取可预约的全部银行
			getAllBank() {
				uni.request({
					url: `http://localhost:8082/system/bank/getAllBank/true`,
					method: 'GET',
					success: (res) => {
						console.log(res);
						if (res.data.code === 200) {
							this.allBank = res.data.data
						}
					}
				})
			},
			bankChange(e) {
				this.formData.bankName = e.detail.value
				uni.request({
					url: 'http://localhost:8082/refundInfo/getAllRefunds',
					method: 'POST',
					data: {
						"bankName": e.detail.value
					},
					success: (res) => {
						console.log(res);
						if (res.data.code === 200) {
							this.allBusiness = res.data.data.data
						}
					}
				})
			},
			businessChange(e) {
				this.formData.businessName = e.detail.value
			},
			submit(form) {
				this.$refs.form.validate().then(res => {
					let data = {
						...res,
						userName: uni.getStorageSync('userName'),
						// 转成时间戳
						appointmentTime: Date.parse(new Date(this.formData.appointmentTime))
					}
					uni.request({
						url: 'http://localhost:8082/book/save',
						method: 'POST',
						timeout: 3000,
						data,
						success: (res) => {
							// console.log('res',res);
							if (res.data.code === 200) {
								uni.showToast({
									title: '预约成功！',
									duration: 2000,
								})

								// 退回页面
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/index/index'
									})
									this.formData.appointmentTime = ''
									// 取消勾选
									this.reset = false
								}, 2000)
							}
						}
					})
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.book {
		padding: 7px;

		/deep/.uni-forms-item.is-direction-left {
			align-items: center;
		}

		.radio {
			display: inline-block;
		}

		.btn {
			color: #fff;
			padding: 3px 7px;
			// border: 1px solid  #fff;
			display: inline-block;
			border-radius: 8px;
			background-color: #8666ac;
			margin-top: 12px;
		}
	}
</style>
