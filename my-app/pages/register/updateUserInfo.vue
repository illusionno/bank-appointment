<template>
	<view class="content">
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item label="用户名" name="userName">
				<input type="text" v-model="formData.userName" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="姓名" name="name">
				<input type="text" v-model="formData.name" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item name="phone" label="手机号">
				<input v-model="formData.phone" placeholder="请输入手机号" />
			</uni-forms-item>
		<!-- 	<uni-forms-item name="passWord" label="修改密码">
				<input  v-model="formData.passWord" placeholder="请输入密码" password />
			</uni-forms-item> -->
			<uni-forms-item name="certificatesType" label="证件类型">
				<radio-group @change="radioChange">
					<label class="radio">
						<radio style="transform: scale(0.7)" :value="1" :checked="formData.certificatesType == 1" />身份证
					</label>
					<label class="radio">
						<radio style="transform: scale(0.7)" :value="2" :checked="formData.certificatesType == 2"/>其他证件
					</label>
				</radio-group>
			</uni-forms-item>
			<uni-forms-item name="certificatesNo" label="证件号">
				<input v-model="formData.certificatesNo" placeholder="请输入证件号" />
			</uni-forms-item>
		</uni-forms>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				formData:{},
				passWord:'',
				rules: {
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
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								minLength: 2,
								maxLength: 5,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					phone: {
						rules: [{
								required: true,
								errorMessage: '请输入手机号',
							},
							{
								validateFunction: (rule, value, data, callback) => {
									// 异步需要返回 Promise 对象
									return new Promise((resolve, reject) => {
										setTimeout(() => {
											let reg =
												/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
											if (reg.test(value)) {
												// 通过返回 resolve
												resolve()
											} else {
												// 不通过返回 reject(new Error('错误信息'))
												reject(new Error('请输入合法的手机号'))
											}
										}, 2000)
									})
								}
							}
						]
					},
					passWord: {
						rules: [{
								required: true,
								errorMessage: '请输入密码',
							},
							// {
							// 	minLength: 6,
							// 	maxLength: 12,
							// 	errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
							// }
						]
					},
					certificatesNo: {
						rules: [{
							required: true,
							errorMessage: '请输入证件号',
						}]
					},
					certificatesType: {
						rules: [{
							required: true,
							errorMessage: '请选择证件类型',
						}]
					},
				}
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		onLoad(options) {
			this.formData = JSON.parse(options.data)
		},
		methods:{
			radioChange(e) {
				this.formData.certificatesType = e.detail.value
			},
			submit(form) {
				this.$refs.form.validate().then(res => {
					let data = {
						...res,
						passWord:this.formData.passWord,
						id:this.formData.id,
					}
					// console.log('表单数据信息：', data);
					uni.request({
						url: 'http://localhost:8082/sysUser/update',
						data: data,
						method: 'POST',
						timeout: 3000,
						success: (res) => {
							console.log('update=', res.data);
							if (res.data.code === 200) {
								uni.showToast({
									title: '修改成功！',
									duration: 2000,
								})
								// 退回页面
								setTimeout(() =>{
									uni.navigateBack({})
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
	.content{
				padding: 6px;
				/deep/.uni-forms-item.is-direction-left {
					align-items: center;
				}
	}
</style>