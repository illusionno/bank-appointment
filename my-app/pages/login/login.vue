<template>
	<view class="content">
		<view class="wrapinput">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item label="用户名" name="userName">
					<input type="text" v-model="formData.userName" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="passWord">
				<input v-model="formData.passWord" placeholder="请输入密码" password />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="btn-row">
		    <button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<text class="actiontext" @click="registeraccount">注册账号</text>
			<!-- <text>|</text>
			<text class="actiontext" @click="Sendmail">忘记密码</text> -->
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				formData:{
					userName:'',
					passWord:''
				},
				rules: {
					userName: {
						rules: [{
								required: true,
								errorMessage: '请输入用户名',
							},	
						]
					},
					passWord: {
						rules: [{
								required: true,
								errorMessage: '请输入密码',
							},	
						]
					}
					}
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		methods:{
			registeraccount(){
				uni.navigateTo({
					url:'/pages/register/register'
				})		
			},
			bindLogin(form){
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
					uni.request({
						url: 'http://localhost:8082/user/login',
						data: res,
						method: 'POST',
						timeout: 3000,
						success: (res) => {
							console.log('login=', res.data);
							if (res.data.code === 200) {
								// console.log(res.data.data.token);
								uni.setStorageSync('token', res.data.data.token);
								uni.setStorageSync('userName',this.formData.userName)
								uni.setStorageSync('isLogin',true)
								uni.showToast({
									title: '登录成功！',
									duration: 2000,
								})
								setTimeout(() =>{
								uni.reLaunch({
									 url: '/pages/index/index'
								})
								},2000)
							}else{
								uni.showToast({
									title: '用户名密码错误！',
									icon:'error',
									duration: 2000,
								})
							}
						}
					})
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.content{
		// background: #eeeeee;
		// height: calc(100vh - var(--window-top));
		padding: 6upx;
	}
	// .wrapinput{
	// 	padding: 60upx 20upx;
	// }
	/deep/.uni-forms-item.is-direction-left {
		align-items: center;
	}
	// .btn-row{
	// 	padding: 20upx;
	// }
	.action-row {
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	}
	.action-row navigator {
	    color: #007aff;
	    padding: 0 20upx;
	}
	.actiontext{
		color: #007aff;
		padding: 0 20upx;
		display: inline-block;
		vertical-align: middle;
	}
	.oauth-row {
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	}
	.oauth-image {
	    width: 100upx;
	    height: 100upx;
	    border: 1upx solid #dddddd;
	    border-radius: 100upx;
	    margin: 0 40upx;
	    background-color: #ffffff;
	}
	.oauth-image image {
	    width: 60upx;
	    height: 60upx;
	    margin: 20upx;
	}
</style>