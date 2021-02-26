<template>
  <div id="apps">
        <div class="contents">

            <div class="content_input">
              <div class="avator_img">
                <img :src="avatorurl" alt="">
              </div>
                <el-input v-model="UserName" clearable placeholder="用户名"></el-input>
                <el-input v-model="PassWord" clearable show-password placeholder="密码"></el-input>
                <div class="content_button">
                    <el-button v-if="this.admin == 'xueshen'" type="primary" @click="SignIn">学生登录</el-button>
                    <el-button v-if="this.admin == 'teacher'" type="primary" @click="teacherSignIn">教师登录</el-button>
					<el-button v-if="this.admin == 'guanliyuan'" type="primary" @click="adminSignIn">管理员登录</el-button>
                </div>
				<div style="display: flex;
    justify-content: space-around;">
				
				<!-- <p class='register' @click='register()'>--立即注册--</p> -->

				<p class='register'  @click='guanliyuan()'>--切换身份--</p>
				</div>

            </div>
        </div>
	
    </div>
</template>

<script>
import '../../assets/ribbon'
// import '../../assets/index'
export default {
  name: 'apps',
  data () {
    return {
	  dialogVisible:false,
      UserName: '',
	  admin:'xueshen',
	  people: true,
      PassWord: '',
	  target: 1,
	  ruleForm:{
		  user:'',
		  pass:''
	  },
      avatorurl: require('../../assets/xueshen.jpg')
    }
  },
  watch:{
    // 'UserName':function(vnew,vold){
    //   if(vnew == 'admin'){
    //     this.avatorurl = require('../../assets/avator_img.png')
    //   }else{
		  
    //     this.avatorurl = require('../../assets/morenavator_img.png')
    //   }
	// },
	'target':function(vnew,vold){
		if(vnew % 3 == 1 ){
		  this.admin = 'xueshen'
          this.UserName = ''
          this.PassWord = ''
          this.avatorurl = require('../../assets/xueshen.jpg')
		}else if(vnew % 3 == 2){
			this.admin = 'teacher'
             this.UserName = ''
          this.PassWord = ''
            this.avatorurl = require('../../assets/laoshi.jpg')
		}else{
            this.admin = 'guanliyuan'
             this.UserName = ''
          this.PassWord = ''
            this.avatorurl = require('../../assets/guanliyuuan.jpg')
        }
	}
  },
  methods: {
      teacherSignIn(){
        let stuparam = {
            tPhone: this.UserName,
            tPwd:this.PassWord
        }
        this.$http({
            method: 'post',
            url: 'teacher/teacherLogin',
            data: stuparam
        }).then(res=>{
            if(res.code == 200){
				var data = res.data
				console.log(data)
                localStorage.setItem('role','teacher')
                localStorage.setItem('tcard',data.tcard)
                localStorage.setItem('tgrade',data.tgrade)
                localStorage.setItem('tname',data.tname)
				localStorage.setItem('tphone',data.tphone)
				localStorage.setItem('username',data.tphone)
                localStorage.setItem('tpwd',data.tpwd)
                localStorage.setItem('tsubject',data.tsubject)
                this.$router.push('/tables')
            }else{
							this.$message.error(res.msg)
						}
        })
      },
	  guanliyuan(){
		this.target += 1
	  },
	  adminSignIn(){
// let adminparam = new URLSearchParams()
// 					adminparam.append('name', this.UserName)
// 					adminparam.append('password', this.PassWord)
let adminparam = {
                        adminUser: this.UserName,
                        adminPwd:this.PassWord
                    }
					this.$http({
						method: 'post',
						url: 'admin/adminLogin',
						data: adminparam
					}).then(res=>{
						if(res.code == 200){
                            localStorage.setItem('id',res.data.adminId)
							localStorage.setItem('username',this.UserName)
							localStorage.setItem('userpassword',this.PassWord)
							localStorage.setItem('role','admin')
							this.$router.push('/tables')
						}else{
							this.$message.error(res.msg)
						}
					})
	  },
	//   submitForm(){
	// 	  if (!this.ruleForm.user) {
    //                 this.$notify.error({
    //                     title: '错误',
    //                     message: '用户名不能为空'
    //                 });
    //                 return;
    //             } else if (!this.ruleForm.pass) {
    //                 this.$notify.error({
    //                     title: '错误',
    //                     message: '密码不能为空'
    //                 });
    //                 return;
    //             } else {
	// 	  			let params = new URLSearchParams()
	// 				params.append('username', this.ruleForm.user)
	// 				params.append('userpassword', this.ruleForm.pass)
	// 				this.$http({
	// 					method: 'post',
	// 					url: 'http://localhost:8080/user/userRegister',
	// 					data: params
	// 				}).then(res=>{
	// 					console.log(res.status)
	// 					if(res.status == 200){
	// 						this.$message.success('注册成功')
	// 						this.dialogVisible = false
	// 						this.ruleForm.user = ''
	// 						this.ruleForm.pass = ''
	// 					}else{
	// 						this.$message.error(res.data.msg)
	// 					}
	// 				})
	// 			}
	//   },
	  
            SignIn() {
                let that = this;
                let username = that.UserName;
                let password = that.PassWord;
                if (!username) {
                    this.$notify.error({
                        title: '错误',
                        message: '用户名不能为空'
                    });
                    return;
                } else if (!password) {
                    this.$notify.error({
                        title: '错误',
                        message: '密码不能为空'
                    });
                    return;
                } else {
                    let param = {
                        stuId: this.UserName,
                        stuPwd:this.PassWord
                    }
					that.$http({
						method: 'post',
						url: '/student/stuLogin',
						data: param
					}).then(res=>{
						if(res.code == 200){
                            var data = res.data
							localStorage.setItem('stuCard',data.stuCard)
							localStorage.setItem('stuGrade',data.stuGrade)
                            localStorage.setItem('stuClass',data.stuClass)
							localStorage.setItem('stuId',data.stuId)
                            localStorage.setItem('stuName',data.stuName)
							localStorage.setItem('stuPwd',data.stuPwd)
							localStorage.setItem('role','student')
                            this.$message.success(res.msg)
							this.$router.push('/tables')
						}else{
                            this.$message.error('登陆失败')

                        }
					})
                }
            }
        }
}
</script>

<style  scoped>
.register{
	font-size: 10px;
    align-content: center;
    vertical-align: middle;
	cursor:pointer;
    text-align: center;
    margin: 24px 0px 0px 0px;
}
.contents {
	width: 500px;
	height: 300px;
	box-sizing: border-box;
	padding: 0 50px;
	border-radius: 5px;
	box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
	background: rgba(255, 255, 255, 0.5);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: mymove 1s ease-in-out  alternate;
	transition: 1.5s;
}

@keyframes mymove {
	0% {
		width: 0px;
		height: 5px;
	}

	10% {
		width: 50px;
		height: 5px;
	}

	15% {
		width: 100px;
		height: 5px;
	}

	20% {
		width: 150px;
		height: 5px;
	}

	25% {
		width: 200px;
		height: 5px;
	}

	30% {
		width: 250px;
		height: 5px;
	}

	35% {
		width: 300px;
		height: 5px;
	}

	40% {
		width: 350px;
		height: 5px;
	}

	45% {
		width: 450px;
		height: 5px;
	}

	50% {
		width: 500px;
		height: 5px;
	}

	55% {
		height: 30px;
	}

	60% {
		height: 60px;
	}

	65% {
		height: 90px;
	}

	70% {
		height: 120px;
	}

	75% {
		height: 150px;
	}

	80% {
		height: 180px;
	}

	85% {
		height: 210px;
	}

	90% {
		height: 240px;
	}

	95% {
		height: 240px;
	}

	100% {
		height: 300px;
	}
}

.content_input {
	width: 300px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

}

.avator_img{
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  border-radius: 50%;
  position: absolute;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  left: 50%;
  transform: translate(-50% , -120%);
  background-color: #fff;
}
.avator_img img {
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
  height: 100%;
}

.content_button {
	margin-top: 10px;
}

.el-input {
	margin-bottom: 25px;
}

.title {
	text-align: center;
	font-size: 24px;
	margin-bottom: 30px;
	font-weight: bold;
	color: #606266;
}

.el-button--primary {
	width: 100%;

}
</style>
