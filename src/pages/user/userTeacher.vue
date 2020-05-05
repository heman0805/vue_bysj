<template>
  <div>
    <h2>个人信息</h2>
    <el-button style="position: relative;left: 350px;" :plain="true" type="danger" round @click="cancel()">注销账号</el-button>
    <div>
      <p class="txt">
        <label style="position:fixed;top: 220px;left: 300px">姓名：{{ruleForm.name}}</label>
        <label style="position:fixed;top: 220px;left:700px">性别：{{ruleForm.sex}}</label>
        <label  style="position:fixed;top: 270px;left: 300px">工号：{{ruleForm.username}}</label>
        <label  style="position:fixed;top: 270px;left: 700px">角色：{{ruleForm.role}}</label>
        <label  style="position:fixed;top: 320px;left: 300px">职位：{{ruleForm.position}}</label>
        <label  style="position:fixed;top: 320px;left: 700px">学院：{{ruleForm.college}}</label>
        <label  style="position:fixed;top: 370px;left: 300px">专业：{{ruleForm.profession}}</label>
        <label  style="position:fixed;top: 370px;left: 700px">年级：{{ruleForm.grade}}</label>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        ruleForm: {
          name: '',
          sex: '',
          username:'',
          college:'',
          profession:'',
          role:'',
          grade:'',
          position:''
        },
      }

    },
    methods:{
      cancel(){
        var _this = this
        var user = JSON.parse(sessionStorage.getItem("user"))
        this.$axios.post('http://localhost:8181/cancel/'+user.tid).then(function (resp) {
            _this.$message("注销成功")
          _this.$router.push('/adminLogin');
            /*localStorage.clear()*/

        })
      }
    },
    created(){
      var _this = this
      var user = JSON.parse(sessionStorage.getItem("user"))
      this.$axios.get('http://localhost:8181/selectTeacherById/'+user.tid).then(function (resp) {
        //console.log(this.map.get("form"))
        console.log(resp)
        _this.ruleForm = resp.data
      })
    }
  }
</script>

<style scoped>
  @import "../../style/zhuce.css";
  .txt{
    font-size: 20px;
    color:black;
    width: 60%;
  }
  .txt-label-0{
    position: relative;
    left: 60px;
    width: 500px;

  }
  .txt-label-1{
    position: relative;
    left: 200px;
    width: 500px;

  }
</style>
