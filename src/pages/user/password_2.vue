<template>
  <div class="main">
    <div class="main0">
      <div class="formBox">
        <h3>登录密码重置</h3>

        <p class="sub"><span>-^0^-</span>  新登录密码重置成功，请重新登录!</p>
        <div class="btnBox_2">
          <!--<button onclick="window.location.href='/login'">重新登录</button>-->
          <el-button  @click="submit('ruleForm')">重新登录</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "password_2",
      methods:{
        submit(){
          var user = JSON.parse(sessionStorage.getItem("user"))
          if(user.role=='教师'||user.role=='学生'){
            this.$router.push('/login');
          }else{
            this.$router.push('/adminLogin');
          }
        }
      }
    }
</script>

<style scoped>
  @import "../../style/password.css";
</style>
