<template>

  <div class="bgd" >
    <div style="position:relative;left:0px;top:10px; width:50%;height:30%">
      <img src="../../picture/i.png" style="margin-top:-3px;margin-left: 0px" />
      <span id="xtmc" >高校信息化平台工作流管理子系统</span>
    </div>
    <div class="backgroud">

      <img src="../../picture/h.png" style="position:relative; left:-17%;top:10px; width:65%;height:95%" />

      <div class="bg" style="position:relative; left:67%;top:-93%; width:32%;height:95%" >
        <span id="formTitle" >管理员登录</span>
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px"
                 style="position:relative;left:-15px;top:60px; width:100%;height:100%"
                 class="demo-ruleForm" >
        <el-form-item label="用户名" prop="username" >
          <!--<el-col :span="10">-->
          <el-input v-model="ruleForm.username" ></el-input>
          <!--</el-col>-->
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <!-- <el-col :span="10">-->
          <el-input type="password" v-model="ruleForm.password"></el-input>
          <!--</el-col>-->
        </el-form-item>
        <el-form-item label="角色">
          <el-radio-group v-model="ruleForm.group">

            <el-radio label="管理人员"></el-radio>
            <el-radio label="办事处"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('ruleForm')">提交</el-button>
          <el-button @click="register()">注册</el-button>
        </el-form-item>
      </el-form>
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
          role:[
            { required: true, message: '角色不能为空' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
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
              // this.loginBtn = "登录"
              // this.$message.error("账号或密码错误")
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
  #formTitle{
    color:black;
    position:relative;
    top: 30px;
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
  .header{
    background-image: url("../../picture/i.png");
    position:fixed;
    top: 15px;
    left: 15px;
    width:15%;
    height:8%;
  }
  .bg {
    background-color:#fcfcfc /*此处更换为所需的颜色代码*/

  }
</style>

<!--<style scoped>
  .backgroud{
    background-image: url("../../picture/login.png");
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    min-width: 1000px;
    z-index:-10;
    zoom: 1;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    z-index: -1;
  }
  .bg {
    /*background-color:#99FFCC*/ /*此处更换为所需的颜色代码*/

  }
  .demo-ruleForm{

  }
</style>-->
