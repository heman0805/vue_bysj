<template>
  <div>
    <h2>个人信息</h2>
    <div>
      <p class="txt">
        <label style="position:fixed;top: 220px;left: 300px">姓名：{{ruleForm.name}}</label>
        <label style="position:fixed;top: 220px;left:700px">性别：{{ruleForm.sex}}</label>
        <label  style="position:fixed;top: 270px;left: 300px">学号：{{ruleForm.userName}}</label>
        <label  style="position:fixed;top: 270px;left: 700px">学院：{{ruleForm.college}}</label>
        <label  style="position:fixed;top: 320px;left: 300px">专业：{{ruleForm.profession}}</label>
        <label  style="position:fixed;top: 320px;left: 700px">班级：{{ruleForm.class_}}</label>
        <label  style="position:fixed;top: 370px;left: 300px">年级：{{ruleForm.grade}}</label>
        <label  style="position:fixed;top: 370px;left: 700px">辅导员：{{ruleForm.instructor}}</label>
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
            userName:'',
            college:'',
            profession:'',
            class_:'',
            grade:'',
            instructor:''
          },
        }

      },
      created(){
        var _this = this
        var user = JSON.parse(sessionStorage.getItem("user"))
        this.$axios.get('http://localhost:8181/selectStudentById/'+user.sid).then(function (resp) {
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
