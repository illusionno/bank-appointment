<template>
	<view class="my">
		<view class="user-card">
			<!-- 已登录 -->
			<view v-if="isLogin">
				<view class="usercard-top" @click="goUserInfo">
					<view class="avatar">
						<image src="../../static/imgs/avatar/login.png"></image>
					</view>
					<text>{{userName}}</text>
				</view>
				<uni-list>
					<uni-list-item title="个人信息" link to="/pages/register/updateRegister"></uni-list-item>
					<uni-list-item title="查看预约" link ></uni-list-item>
					<uni-list-item title="退出" link @click="exit"></uni-list-item>
					<uni-list-item title="关于" link @click="about"></uni-list-item>
				</uni-list>
			</view>

			<!-- 未登录 -->
			<view class="usercard-top" v-else>
				<view class="avatar" @click="gologin">
					<image src="../../static/imgs/avatar/no-login.png"></image>
				</view>
				<text @click="gologin">未登录</text>
				<!-- <text  class="login-btn" @click="gologin">去登录</text> -->
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
userInfo:[]
			}
		},
		computed: {
			isLogin() {
				return uni.getStorageSync('token') ? true : false
			},
			userName() {
				return uni.getStorageSync('userName')
			}
		},
		methods: {
			gologin() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			exit(){
				uni.showModal({
					title: '提示',
					content: '确定要退出登陆吗？',
					success: function (res) {
						if (res.confirm) {
							uni.removeStorageSync('token');
							uni.removeStorageSync('userName');
							uni.switchTab({
								url:'/pages/my/my'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			// 查看个人信息
			goUserInfo(){
				uni.request({
					url: 'http://localhost:8082/sysUser/getUserInfo',
					method: 'POST',
					timeout: 3000,
					data:{
						userName:uni.getStorageSync('userName')
					},
					success: (res) => {
						if (res.data.code === 200) {
							if(res.data.code === 200){
								this.userInfo = res.data.data[0]
								uni.navigateTo({
									url:`/pages/register/getUserInfo?data=${JSON.stringify((this.userInfo))}`
								})
							}
						}
					}
				})
			},
			// 关于
			about(){
				uni.showToast({
					title:'银行预约系统 v1.0',
					icon:"none",
					duration:2000
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.user-card {
		width: 100%;
		

		.usercard-top {
			
			height: 320upx;
			background: #e6e6e6;
			border-radius: 15upx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.avatar {
				width: 100upx;
				height: 100upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			text {
				display: block;
				text-align: center;
			}

			.login-btn {
				display: block;
				padding: 3upx;
				margin-top: 7upx;
			}
		}
	}
</style>
