<template>
  <div class="el-main-demo">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">请假申请</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">申请记录</a></el-breadcrumb-item>

    </el-breadcrumb>

      <div class="el-main-table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          label="姓名"
          prop="name"
          width="80px">
        </el-table-column>
        <el-table-column
          label="专业"
          prop="profession"
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

      /*change(form){
        var _this = this
        var profession = this.form.profession
        console.log(profession)
        //查找该专业所有班级
        this.$axios.get('http://localhost:8181/user/holiday/classes/' + profession).then(function (resp) {
          console.log(resp)
          _this.classes = resp.data
        })
      },
      submit(form){

        const _this = this
        var class_ = this.form.class_
        console.log("专业",this.form.profession)
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
      }*/
    },
    created(){
      const _this = this
      const user = JSON.parse(sessionStorage.getItem("user"))
      var position = user.position
      if(position=='系主任'){
        var profession = user.profession
        //默认查找该专业所有请假信息
        this.$axios.get('http://localhost:8181/user/holiday/searchTeacherHoliday/'+"profession/"+profession).then(function (resp){
          console.log(resp)
          for(let i = 0;i<resp.data.length;i++){
            let begintime = new Date(resp.data[i].beginTime)
            let endtime = new Date(resp.data[i].endTime)
            resp.data[i].beginTime = formatDate(begintime, 'yyyy-MM-dd hh:mm:ss')
            resp.data[i].endTime = formatDate(endtime, 'yyyy-MM-dd hh:mm:ss')
          }
          _this.tableData = resp.data
        })
      }
      if(position=='院长'||position=='书记'){
        var college = user.college
        //默认查找该专业所有请假信息
        this.$axios.get('http://localhost:8181/user/holiday/searchTeacherHoliday/'+"college/"+college).then(function (resp){
          console.log(resp)
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
        tableData: [{
          name:'',
          profession:'',
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
