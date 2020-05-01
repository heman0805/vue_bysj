<template>

  <div class="main">
    <div class="main0">
      <div class="formBox">
        <h3>登录密码重置</h3>


        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="200px"
                 style="position:relative;left:0px;top:40px; width:70%;height:100%"
                 >
          <el-form-item label="原密码" prop="oldPassword" style="height: 60px">
            <el-input v-model="ruleForm.oldPassword" ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword" style="height:60px">
            <el-input type="password" v-model="ruleForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="newPassword" style="height: 60px">
            <el-input type="password" v-model="ruleForm.resPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btnBox">
              <el-button  @click="submit('ruleForm')">提交</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>


</template>

<script>
    export default {
        name: "password",
      data() {
        return {
          ruleForm: {
            oldPassword: '',
            newPassword: '',
            resPassword:''
          },
          rules: {
            oldPassword: [
              { required: true, message: '原密码不能为空', trigger: 'blur' },
              { min: 6, message: '原密码长度在应大于6', trigger: 'blur' }
            ],
            newPassword: [
              { required: true, message: '新密码不能为空', trigger: 'blur' },
              { min: 6, message: '新密码长度在应大于6', trigger: 'blur' }
            ],
            resPassword:[
              { required: true, message: '确认密码不能为空' },
              { min: 6, message: '确认密码长度在应大于6', trigger: 'blur' }
            ]
          },
        }
      },
      methods:{
        submit(ruleForm){
          var _this = this
          var user = JSON.parse(sessionStorage.getItem("user"))
          var data ={};
          data.form = this.ruleForm
          data.user = user
          console.log(data)
          this.$axios.post('http://localhost:8181/password',data).then(function (resp) {
            //console.log(this.map.get("form"))
            console.log(resp)
            if(resp.data=='修改成功'){
              _this.$router.push('/password_2');
            }
            _this.$message(resp.data)

          })
        }
      }
    }
</script>

<style scoped>
  @import "../../style/password.css";
</style>
