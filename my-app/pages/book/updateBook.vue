<template>
	<view class="book">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
					<uni-forms-item name="bankName" label="银行名称" label-width="90">
					<input type="text" v-model="formData.bankName" disabled="true">
					</uni-forms-item>
					<uni-forms-item name="businessName" label="业务名称" label-width="90">
					<input type="text" v-model="formData.businessName" disabled="true">
					</uni-forms-item>
					<uni-forms-item label="预约时间" name="appointmentTime" label-width="90">
					<uni-datetime-picker type="datetime" v-model="formData.appointmentTime"/>
					</uni-forms-item>
					<button type="primary" class="primary" @tap="submit">提交</button>
				</uni-forms>
	</view>
</template>

<script>
	export default{
		
		data(){
			return{
				formData:{
					bankName:'',
					businessName:'',
					appointmentTime:''
				},
				rules: {
					appointmentTime: {
						rules: [{
								required: true,
								errorMessage: '请选择预约时间',
							}
						]
					},
				}
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		
		onLoad(options){
			this.formData = JSON.parse(options.data)
			this.formData.appointmentTime = this.formDate(this.formData.appointmentTime)
		},
		methods:{
			// 时间戳转日期
		formDate(n){
		  return new Date(n).toLocaleDateString().replace(/\//g, "-") + " " + new Date(n).toTimeString().substr(0, 8)
		},
			submit(form) {
				this.$refs.form.validate().then(res => {
					let data = {
						...this.formData,
						// 转成时间戳
						appointmentTime:Date.parse(new Date(this.formData.appointmentTime))
					}
					uni.request({
						url:'http://localhost:8082/book/update',
						method:'POST',
						timeout:3000,
						data,
						success: (res) => {
							// console.log('res',res);
							if(res.data.code === 200){
								uni.showToast({
									title: '成功修改预约时间',
									duration: 2000,
								})
								// this.formData = {}
								this.formData.bankName=''
								this.formData.businessName=''
								// 退回页面
								setTimeout(() =>{
									uni.switchTab({
										url:'/pages/index/index'
									})
								},2000)
							}
						}
					})
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.book{
		padding: 6px;
		/deep/.uni-forms-item.is-direction-left {
			align-items: center;
		}
	}
</style>