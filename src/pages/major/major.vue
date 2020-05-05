<template>
  <div class="el-main-demo">

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">转专业申请</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">填写申请</a></el-breadcrumb-item>

    </el-breadcrumb>

    <div class="el-main-form">
      <el-form  :inline="true"  ref="form" :model="form" :rules="rules" label-width="100px">
        <!--<el-form-item label="拟转向学院" prop="newCollege">
          <el-col :span="30">
            <el-input type="text" v-model="form.newCollege"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="拟转向专业" prop="newProfession">
          <el-col :span="30">
            <el-input type="text" v-model="form.newProfession"></el-input>
          </el-col>
        </el-form-item>-->

        <el-form-item label="拟转向学院" prop="newCollege">
          <el-select v-model="form.newCollege" @change="collegeChange('ruleForm')" placeholder="---请选择学院---">
            <el-option v-for="item in college" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="拟转向专业" prop="newProfession">
          <el-select v-model="form.newProfession" placeholder="---请选择专业---">
            <el-option v-for="item in profession" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班内职位" prop="post" >
          <el-col :span="30">
            <el-input type="text" v-model="form.post" placeholder="如没有请填无"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="成绩排名" prop="rank">
          <el-col :span="30">
            <el-select v-model="form.rank"  placeholder="---请选择---">
              <el-option v-for="item in rank" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="GPA" prop="gpa">
          <el-col :span="30">
            <el-input type="text" v-model="form.gpa"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="申请理由" prop="reason">
          <el-col :span="50">
            <el-input type="textarea" v-model="form.reason"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参加比赛" prop="contest"
                      style="position: relative;left: -100px">
          <el-col :span="70">
            <el-input type="textarea" v-model="form.contest"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参加社团" prop="society"
                      style="position: relative;left: -93px">
          <el-col :span="70">
            <el-input type="textarea" v-model="form.society"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item style="position: relative;left: -600px;top: 100px">
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
          newCollege:[
            {value:'计算机学院',label:'计算机学院'}
          ],
          newProfession:[
            {value:'计算机学院',label:'计算机学院'}
          ],
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
        college:[
          ''
        ],

        profession:[
          ''
        ],
        rules: {
          newCollege:[
            {required: true, message: '学院不能为空', trigger: 'blur'},
          ],
          newProfession: [
            {required: true, message: '专业不能为空', trigger: 'blur'},
          ],
          post: [
            {required: true, message: '班内职务不能为空', trigger: 'blur'},
          ],
          rank: [
            {required: true, message: '成绩排名不能为空', trigger: 'blur'},
          ],
          gpa: [
            {required: true, message: 'gpa不能为空', trigger: 'blur'},
          ],
          reason: [
            {required: true, message: '请假理由不能为空', trigger: 'blur'},
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {

      submit(form) {
        this.$refs[form].validate( valid => {
          if (valid) {

            var _this = this
            var data = {};
            let beginTime = new Date(this.form.beginTime);
            let endTime = new Date(this.form.endTime);
            this.form.beginTime = formatDate(beginTime, 'yyyy-MM-dd hh:mm:ss')
            this.form.endTime = formatDate(endTime, 'yyyy-MM-dd hh:mm:ss')
            data.form = this.form
            data.user = JSON.parse(sessionStorage.getItem("user"))
            if(this.form.newCollege==data.user.college){
              this.$message.error("请选择其他学院及专业")
            }
            else{
              this.$axios.post('http://localhost:8181/user/major/insert', data).then(function (resp) {
                //console.log(this.map.get("form"))
                console.log(resp.data)
                if(resp.data.msg=='转专业申请成功')
                  _this.$message(resp.data.msg)
                else
                  _this.$message.error(resp.data.msg)
                _this.$refs[form].resetFields()
              })
            }
          }
        })
      },
      collegeChange(form){
        var _this = this
        _this.form.newProfession = null
        //后台查询所有学院名称并设置
        this.$axios.get('http://localhost:8181/searchProfessionesByCollege/'+this.form.newCollege).then(function (resp) {
          console.log(resp)
          _this.profession = resp.data
        })
      },
    },
    created(){
      var _this = this
      //后台查询所有学院名称并设置
      this.$axios.get('http://localhost:8181/searchAllCollege').then(function (resp) {
        console.log(resp)
        _this.college = resp.data
      })
    }
  }
</script>
