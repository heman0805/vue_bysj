<template>
  <div class="el-main-demo">

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">项目申请</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">填写申请</a></el-breadcrumb-item>

    </el-breadcrumb>

    <div class="el-main-form">
      <el-form  :inline="true"  ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="项目名称" prop="projectName" style="position: relative;left: -50px">
          <el-col :span="30">
            <el-input type="text" v-model="form.projectName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="项目背景" prop="context" style="position: relative;left: -20px">
          <el-col :span="30">
            <el-input type="textarea" v-model="form.context"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="研究意义" prop="mean">
          <el-col :span="30">
            <el-input type="textarea" v-model="form.mean"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="预期结果" prop="result" style="position: relative;left: 10px;">
          <el-col :span="30">
            <el-input type="textarea" v-model="form.result"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="项目申请资金" prop="fund" style="position: relative;left: 35px">
          <el-col :span="30">
            <el-input type="text" v-model="form.fund"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="资金详细信息" prop="fundItem" style="position: relative;left: 60px">
          <el-col :span="50">
            <el-input type="textarea" v-model="form.fundItem"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item style="position: relative;left: -800px;top: 90px">
          <el-button  :plain="true" type="primary" round @click="submit('form')">提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
  @import "../../style/el-main-demo.css";
</style>
<script>
  import {formatDate} from '../../js/date.js';
  export default {
    data() {
      return {
        form: {
          projectName:'',
          context:'',
          mean:'',
          result:'',
          fund:'',
          fundItem:''
        },
        rules: {
          reason: [
            {projectName: true, message: '项目名称不能为空', trigger: 'blur'},
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            {context: true, message: '项目背景不能为空', trigger: 'blur'},
            {mean: true, message: '研究意义不能为空', trigger: 'blur'},
            {result: true, message: '预期结果不能为空', trigger: 'blur'},
            {fund: true, message: '资金不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {

      submit(form) {
        console.log(this.form)
        var _this = this
        var data ={};
        data.form = this.form
        data.user = JSON.parse(sessionStorage.getItem("user"))

        this.$axios.post('http://localhost:8181/user/project/insert',data).then(function (resp) {
          console.log(resp.data)
          if(resp.data.msg=='申请成功')
            _this.$message(resp.data.msg)
          else
            _this.$message.error(resp.data.msg)
          _this.$refs[form].resetFields()
        })
      }
    }
  }
</script>
