<template>
  <div class="el-main-demo">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">请假申请</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">申请记录</a></el-breadcrumb-item>

    </el-breadcrumb>

    <div class="el-main-demo">
      <el-form :inline="true" ref="form" :model="form"  label-width="80px">

        <el-form-item label="专业" prop="profession">
          <el-col :span="20">
            <el-select v-model="form.profession" @change="change('form')" placeholder="请选择专业">
              <el-option v-for="item in profession" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="班级" prop="class_">
          <el-col :span="20">
            <el-select v-model="form.class_"  placeholder="请选择班级">
              <el-option v-for="item in classes" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button  :plain="true" type="primary" round @click="submit('form')">查看</el-button>
        </el-form-item>
      </el-form>
    </div>

      <div class="el-main-table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          label="班级"
          prop="class_"
          width="80px">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          width="80px">
        </el-table-column>
        <el-table-column
          label="开始时间"
          prop="beginTime"
          width="100px">
        </el-table-column>

        <el-table-column
          label="结束时间"
          prop="endTime"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="days"
          label="请假天数"
          width="80px">
        </el-table-column>
        <el-table-column
          label="请假类型"
          prop="vacationType"
          width="80px">
        </el-table-column>
        <el-table-column
          label="请假理由"
          prop="reason">
        </el-table-column>
        <el-table-column
          label="审批结果"
          prop="checkResult">
        </el-table-column>
        <el-table-column
          label="审批意见"
          prop="opinion">
        </el-table-column>
       <!-- <el-table-column
          label="审批意见"
          prop="opinion">
        </el-table-column>
        <el-table-column
          label="审批结果"
          prop="checkResult"
          width="80px">
        </el-table-column>-->
      </el-table>
    </div>
  </div>
</template>
<style>
  @import "../../style/el-main-demo.css";
</style>
<script>
  import {formatDate} from '../../js/date.js';
  export default {
    methods:{

      change(form){
        var _this = this
        var profession = this.form.profession
        //查找该专业所有班级
        this.$axios.get('http://localhost:8181/user/holiday/classes/' + profession).then(function (resp) {
          _this.classes = resp.data
        })
      },
      submit(form){

        const _this = this
        var class_ = this.form.class_
        const user = JSON.parse(sessionStorage.getItem("user"))
        var tid = user.tid
        this.$axios.get('http://localhost:8181/user/holiday/searchHoliday/'+tid+"/class/"+class_).then(function (resp){
          for(let i = 0;i<resp.data.length;i++){
            let begintime = new Date(resp.data[i].beginTime)
            let endtime = new Date(resp.data[i].endTime)
            resp.data[i].beginTime = formatDate(begintime, 'yyyy-MM-dd hh:mm:ss')
            resp.data[i].endTime = formatDate(endtime, 'yyyy-MM-dd hh:mm:ss')
          }
          _this.tableData = resp.data
        })
      }
    },
    created(){
      const _this = this
      const user = JSON.parse(sessionStorage.getItem("user"))
      if(user.position=='辅导员'||user.position=='系主任') {
        var profession = user.profession
        var prof=[profession]
        _this.profession = prof
        //查找该用户所在专业所有班级
        this.$axios.get('http://localhost:8181/user/holiday/classes/' + profession).then(function (resp) {
          _this.classes = resp.data
        })
        //默认查找该专业所有请假信息
        var profession = user.profession
        var tid = user.tid
        this.$axios.get('http://localhost:8181/user/holiday/searchHoliday/'+tid+"/profession/"+profession).then(function (resp){
          for(let i = 0;i<resp.data.length;i++){
            let begintime = new Date(resp.data[i].beginTime)
            let endtime = new Date(resp.data[i].endTime)
            resp.data[i].beginTime = formatDate(begintime, 'yyyy-MM-dd hh:mm:ss')
            resp.data[i].endTime = formatDate(endtime, 'yyyy-MM-dd hh:mm:ss')
          }
          _this.tableData = resp.data
        })
      }
      //角色为书记或院长，查找所在学院所有专业，班级进行联动
      else if(user.position=='书记'||user.position=='院长') {
        var college = user.college
        var tid = user.tid
        //查找该用户所在学院所有专业
        this.$axios.get('http://localhost:8181/user/holiday/profession/'+college).then(function (resp) {
          _this.profession = resp.data
        })
        //默认查找该学院所有请假信息
        this.$axios.get('http://localhost:8181/user/holiday/searchHoliday/'+tid+"/college/"+college).then(function (resp){
          for(let i = 0;i<resp.data.length;i++){
            let begintime = new Date(resp.data[i].beginTime)
            let endtime = new Date(resp.data[i].endTime)
            resp.data[i].beginTime = formatDate(begintime, 'yyyy-MM-dd hh:mm:ss')
            resp.data[i].endTime = formatDate(endtime, 'yyyy-MM-dd hh:mm:ss')
          }
          _this.tableData = resp.data
        })
      }


    },
    data() {
      return {
        form: {
          class_:[
            {value:'软件1604',label:'1604'},
            {value:'软件1603',label:'1603'}
          ],
          profession:[
            {value:'软件工程',label:'软件工程'}
          ]
        },
        classes:[
          ''
        ],
        profession:[
          ''
        ],
        tableData: [{
          class_:'',
          name:'',
          beginTime:'',
          endTime:'',
          days:'',
          vacationType:'',
          reason:'',
          checkResult:'',
          opinion:''
        }],
      };

    }
  }
</script>
