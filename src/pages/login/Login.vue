<template>
<div >

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
  <div style="position:relative;left:50%;top:80px; width:25%;height:50%" >
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
   <!-- <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm.age"></el-input>
    </el-form-item>-->
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
          console.log(this.ruleForm)
          this.$refs[LoginForm].validate( valid =>{
            if(valid){

              this.$axios.post('http://localhost:8181/login',this.ruleForm).then( res =>{
              /*this.$axios.post('http://localhost:8181/student/selectById/1').then( res =>{*/
                //登陆成功  使用token
                console.log(res)
                if(res.data.msg!=null){//登录有误，展示错误信息
                  this.loading = false
                  // this.loginBtn = "登录"
                  console.log(res.data.msg)
                  this.$message.error(res.data.msg)
                }
                else{//成功登录，存储信息
                  const token = res.data.token;
                  console.log(token)
                  // console.log(token);
                  /*存储到ls*/
                  localStorage.setItem('eleToken',token);
                  console.log("存储到ls成功")
                  /*解析token中的信息*/
                  const decoded = jwt(token);
                  console.log("解析token成功")
                  /*存储至vuex*/
                  //this.$store.commit('set_token', decoded["Authentication-Token"]);
                  window.sessionStorage.setItem("eleToken",decoded)
                  console.log("存储至sessionStorage成功")
                  /*跳转*/
                  console.log('decoded:'+decoded)
                  if(decoded){
                    //登录之后跳转到首页
                    this.$router.push('/student');
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

</style>
