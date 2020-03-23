<template>
<div>

  <el-form  label-position="left":inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">



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
  </el-form>
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
            ]
          }
        };
      },

      methods: {
        login (LoginForm) {
          this.$refs[LoginForm].validate( valid =>{
            if(valid){
              this.$axios.post('http://localhost:8181/login',this.ruleForm).then( res =>{
                //登陆成功  使用token
                const token = res.data;
                console.log(token);
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

              }).catch(error =>{
                  this.loading = false
                 // this.loginBtn = "登录"
                  this.$message.error("账号或密码错误")
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
