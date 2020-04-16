<template>
  <div class="el-main-demo">

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">转专业申请</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">填写申请</a></el-breadcrumb-item>

    </el-breadcrumb>

    <div class="el-main-form">
      <el-form :label-position="right" :inline="true"  ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="拟转向学院" prop="newCollege">
          <el-col :span="30">
            <el-input type="text" v-model="form.newCollege"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="拟转向专业" prop="newProfession">
          <el-col :span="30">
            <el-input type="text" v-model="form.newProfession"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="班内职位" prop="post">
          <el-col :span="30">
            <el-input type="text" v-model="form.post"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="成绩排名" prop="grade">
          <el-col :span="30">
            <el-select v-model="form.rank"  placeholder="---请选择---">
              <el-option v-for="item in rank" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="GPA" prop="newProfession">
          <el-col :span="30">
            <el-input type="text" v-model="form.gpa"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="申请理由" prop="reason">
          <el-col :span="50">
            <el-input type="textarea" v-model="form.reason"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参与比赛" prop="reason">
          <el-col :span="70">
            <el-input type="textarea" v-model="form.contest"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参与社团及职位" prop="society">
          <el-col :span="70">
            <el-input type="textarea" v-model="form.society"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button  :plain="true" type="primary" round @click="submit('form')">提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
  @import "../../style/el-main-demo.css";
  /*.el-main-demo{
    padding-top: 52px;
  }*/
  /*.el-main-form{
    padding-top: 52px;
  }*/
</style>
<script>
  import {formatDate} from '../../js/date.js';
  export default {
    data() {
      return {
        form: {
          newCollege:'',
          newProfession:'',
          post:'',
          rank:'',
          gpa:'',
          contest:'',
          reason: '',
          society:'',

        }
        ,
        rank:[
          '前5%',
          '前10%',
          '前20%',
          '前30%',
        ],
        rules: {
          reason: [
            {required: true, message: '请假理由不能为空', trigger: 'blur'},
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {

      submit(form) {
        console.log(this.form)
        console.log("专业排名：",this.form.rank)
        var _this = this
        var data ={};
        let beginTime = new Date(this.form.beginTime);
        let endTime = new Date(this.form.endTime);
        this.form.beginTime = formatDate(beginTime, 'yyyy-MM-dd hh:mm:ss')
        this.form.endTime = formatDate(endTime, 'yyyy-MM-dd hh:mm:ss')
        data.form = this.form
        data.user = JSON.parse(sessionStorage.getItem("user"))

        this.$axios.post('http://localhost:8181/user/major/insert',data).then(function (resp) {
          //console.log(this.map.get("form"))
          console.log(resp.data)
          _this.$message(resp.data.msg)
          _this.$refs[form].resetFields()
        })

      }
    }
  }
</script>
