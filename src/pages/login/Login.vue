<template>


  <!--<el-form  label-position="left":inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">



    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>

    <el-form-item >
      <el-button type="primary" @click="login('ruleForm')">登录</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>-->


  <div class="backgroud">
      <div style="position:relative;left:60%;top:160px; width:25%;height:50%" >
  <el-form label-position="right" :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px"  class="demo-ruleForm" >
    <el-form-item label="用户名" prop="username" >
      <!--<el-col :span="10">-->
      <el-input v-model="ruleForm.username" ></el-input>
      <!--</el-col>-->
    </el-form-item>
    <el-form-item label="密码" prop="password">
     <!-- <el-col :span="10">-->
      <el-input v-model="ruleForm.password"></el-input>
      <!--</el-col>-->
    </el-form-item>
    <el-form-item label="角色">
      <el-radio-group v-model="ruleForm.role">

        <el-radio label="学生"></el-radio>
        <el-radio label="教师"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
  </div>

</template>

<script>
  import jwt from 'jwt-decode';
  import store from "../../store";
    export default {

      data() {
        return {
          url: '../src/picture/login.jpg',
          ruleForm: {
            username: '',
            password: '',
          },
          rules: {
            username: [
              { required: true, message: '用户名不能为空', trigger: 'blur' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '密码不能为空', trigger: 'blur' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            role:[
              { required: true, message: '角色不能为空' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          },

        };
      },

      methods: {
        login (LoginForm) {
          this.$refs[LoginForm].validate( valid =>{
            if(valid){
              this.$axios.post('http://localhost:8181/login',this.ruleForm).then( res =>{
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
                    this.$router.push('/index');
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
  .backgroud{
    background-image: url("login2.jpg");
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
</style>
