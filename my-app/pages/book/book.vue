<template>
	<view class="book">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item name="bankName" label="银行名称" label-width="90">
				<radio-group @change="bankChange">
					<block v-for="(item,index) in allBank" :key="index">
						<label class="radio" >
							<radio :value="item" style="transform: scale(0.7)" />{{item}}
						</label>
					</block>
				</radio-group>
			</uni-forms-item>
			<uni-forms-item name="businessName" label="业务名称" label-width="90">
				<text v-if="allBusiness.length==0">暂无业务</text>
				<radio-group v-else @change="businessChange">
					<block v-for="(item,index) in allBusiness" :key="index" >
						<label class="radio" >
							<radio style="transform: scale(0.7)" :value="item.businessName"/>{{item.businessName}}
						</label>
					</block>
			
				</radio-group>
			</uni-forms-item>
			<uni-forms-item label="预约人" name="userName" >
			<input v-model="formData.userName" placeholder="请输入预约人" />
			</uni-forms-item>
			<uni-forms-item label="预约时间" name="appointmentTime" label-width="90">
			<uni-datetime-picker type="datetime" v-model="formData.appointmentTime"/>
			</uni-forms-item>
			<button type="primary" class="primary" @tap="submit">注册</button>
		</uni-forms>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				allBank:[],
				allBusiness:[],
				formData:{
					bankName:'',
					businessName:'',
					userName:'',
					appointmentTime:'',
				},
				rules: {
					bankName: {
						rules: [{
								required: true,
								errorMessage: '请选择银行名称',
							}
						]
					},
					businessName: {
						rules: [{
								required: true,
								errorMessage: '请选择业务名',
							}
						]
					},
					userName: {
						rules: [{
								required: true,
								errorMessage: '请输入用户名',
							},
							{
								minLength: 2,
								maxLength: 8,
								errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
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
		mounted(){
			this.getAllBank()
		},
		methods:{
			getAllBank(){
				uni.request({
					url:'http://localhost:8082/system/bank/getAllBank',
					method:'GET',
					success: (res) => {
						console.log(res);
						if(res.data.code === 200){
							this.allBank = res.data.data
						}
					}
				})
			},
			bankChange(e){
				this.formData.bankName = e.detail.value
				uni.request({
					url:'http://localhost:8082/refundInfo/getAllRefunds',
					method:'POST',
					data:{
						"bankName":e.detail.value
					},
					success: (res) => {
						console.log(res);
						if(res.data.code === 200){
							this.allBusiness = res.data.data.data
						}
					}
				})
			},
			businessChange(e){
				this.formData.businessName = e.detail.value
			},
			submit(form) {
				this.$refs.form.validate().then(res => {
					let data = {
						...res,
						// 转成时间戳
						appointmentTime:Date.parse(new Date(this.formData.appointmentTime))
					}
					console.log('表单数据信息：', data);
					uni.request({
						url:'http://localhost:8082/book/save',
						method:'POST',
						timeout:3000,
						data,
						success: (res) => {
							// console.log('res',res);
							if(res.data.code === 200){
								uni.showToast({
									title: '预约成功！',
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
		padding: 7px;
		/deep/.uni-forms-item.is-direction-left {
			align-items: center;
		}
		.radio{
			display: inline-block;
		}
	}
</style>