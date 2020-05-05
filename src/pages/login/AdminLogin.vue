<template>

  <div class="bgd" >
    <div style="position:relative;left:0px;top:10px; width:50%;height:30%">
      <img src="../../picture/i.png" style="margin-top:-3px;margin-left: 0px" />
      <span id="xtmc" >高校信息化平台工作流管理子系统</span>
    </div>
    <div class="backgroud">

      <img src="../../picture/h.png" style="position:relative; left:-22%;top:10px; width:55%;height:95%" />

      <div class="bg" style="position:relative; left:56%;top:-93%; width:43%;height:95%">
        <div style="position:relative;top:5px;left: -160px">
          <img src="../../picture/user.png"/>
          <div class="pp" style="position:relative;top:-42px;left: 90px">管理员登录</div>
        </div>
        <div class="sub"><p>还没有账号？<a href="/register"><span class="blue">立即注册</span></a></p></div>
        <div class="sub-line"></div>
        <div class="bg">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px"
                 style="position:relative;left:35px;top:45px; width:100%;height:100%"
                 class="demo-ruleForm" >
          <el-form-item label="用户名：" prop="username" >
            <el-col :span="15">
            <el-input v-model="ruleForm.username" ></el-input>
           </el-col>
          </el-form-item>
          <el-form-item label="密码：" prop="password" >
           <el-col :span="15">
            <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button class="xiayibu" type="primary" @click="login('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import jwt from 'jwt-decode';
  import store from "../../store";
  export default {

    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
          role:''
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 6, message: '用户名长度应大于6', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, message: '密码长度应大于6', trigger: 'blur' }
          ],
        },
      };
    },

    methods: {
      register(){
        this.$router.push('/register');
      },
      login (LoginForm) {
        this.$refs[LoginForm].validate( valid =>{
          if(valid){
            console.log(this.ruleForm)
            this.$axios.post('http://localhost:8181/adminLogin',this.ruleForm).then( res =>{
              //登陆成功  使用token
              //console.log(res)
              if(res.data.msg!=null&&res.data.msg!=""){//登录有误，展示错误信息
                this.loading = false
                // this.loginBtn = "登录"
                console.log(res.data.msg)
                this.$message.error(res.data.msg)
              }
              else{//成功登录，存储信息
                sessionStorage.clear()
                localStorage.clear()

                const token = res.data.token;
                //存储用户信息
                var user = res.data.user;
                sessionStorage.setItem("user",JSON.stringify(user))
                /*存储到ls*/
                localStorage.setItem('eleToken',token);
                /*解析token中的信息*/
                const decoded = jwt(token);
                /*存储至vuex*/
                window.sessionStorage.setItem("eleToken",decoded)
                /*跳转*/
                if(decoded){
                  //登录之后跳转到首页
                  if(user.role=="管理"){
                    this.$router.push('/admin');
                  }
                  else {
                    this.$router.push('/office');
                  }
                }else{
                  window.location.reload()
                }
              }
            }).catch(error =>{
              this.loading = false
            })
          }
        })
      },
      isEmpty(value){
        return(
          value ===undefined || value ===null ||
          (typeof  value === "object" && Object.keys(value).length ===0) ||
          (typeof value ==="string" && value.trim().length ===0)
        );
      }
    }
  }
</script>


<style scoped>

  .bgd{
    background:#fafafa;
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
  }
  #xtmc{
    font-size: 25px;
  }
  .backgroud{
    border:solid 3px;
    border-color:#eaebf2 ;
    background:#f7f8f8;
    position:fixed;
    top: 20%;
    left: 8%;
    width:84%;
    height:75%;

  }
  .bg {
    background-color:#fcfcfc /*此处更换为所需的颜色代码*/

  }
  .bg .pp{  font-size:18px; color:#333; padding-left:50px;letter-spacing:9px;}
  .blue{ color:#31acfb}
  .sub{ position:relative;top: -30px; font-size:14px; color:#666;}
  .sub p{ float:right}
  .sub-line{ position:relative;top: -35px;width: 90%;float:right; font-size:14px; color:#666;border-bottom: 1px solid #cccccc;}
  .xiayibu{ position:relative;left:-122px; width:230px; height:40px; text-align:center; color:#fff; background:#30adfa; font-size:14px; border-radius:5px; margin-left:110px; margin-top:20px; cursor:pointer}

</style>
