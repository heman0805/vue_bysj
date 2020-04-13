<template>
  <div class="el-main-demo">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">请假申请</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">教师请假记录</a></el-breadcrumb-item>

    </el-breadcrumb>

      <div class="el-main-table">
      <el-table
        :data="tableData"
        itemscope
        border :header-cell-style="{background:'#D5ECF8',color:'#606266'}"
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
        <el-pagination
          background
          layout="prev, pager, next"
          :pageSize="pageSize"
          :total="total"
          @current-change="page">
        </el-pagination>
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
      page(currentPage){
        const user = JSON.parse(sessionStorage.getItem("user"))
        var position = user.position
        var college = user.college
        if(position=='系主任'){
          var profession = user.profession
          //默认查找该专业所有请假信息
          this.selectByProfession(profession,currentPage)
        }
        if(position=='院长'||position=='书记'){
          //默认查找该专业所有请假信息
          this.selectByCollege(college,currentPage)
        }
      },
      selectByProfession(profession,currentPage){
        console.log("查找教师请假信息")
        var _this = this
        this.$axios.get('http://localhost:8181/user/holiday/searchTeacherHoliday/'+"profession/"+profession+"/"+currentPage+"/"+this.pageSize).then(function (resp){
          console.log(resp)
          for(let i = 0;i<resp.data.data.length;i++){
            let begintime = new Date(resp.data.data[i].beginTime)
            let endtime = new Date(resp.data.data[i].endTime)
            resp.data.data[i].beginTime = formatDate(begintime, 'yyyy-MM-dd hh:mm:ss')
            resp.data.data[i].endTime = formatDate(endtime, 'yyyy-MM-dd hh:mm:ss')
          }
          _this.tableData = resp.data.data
          _this.pageSize = resp.data.size
          _this.total = resp.data.totalElement
        })
      },
      selectByCollege(college,currentPage){
        console.log("查找教师请假信息")
        var _this = this
        this.$axios.get('http://localhost:8181/user/holiday/searchTeacherHoliday/'+"college/"+college+"/"+currentPage+"/"+this.pageSize).then(function (resp){
          console.log(resp)
          for(let i = 0;i<resp.data.data.length;i++){
            let begintime = new Date(resp.data.data[i].beginTime)
            let endtime = new Date(resp.data.data[i].endTime)
            resp.data.data[i].beginTime = formatDate(begintime, 'yyyy-MM-dd hh:mm:ss')
            resp.data.data[i].endTime = formatDate(endtime, 'yyyy-MM-dd hh:mm:ss')
          }
          _this.tableData = resp.data.data
          _this.pageSize = resp.data.size
          _this.total = resp.data.totalElement
        })
      }
    },
    created(){
      const user = JSON.parse(sessionStorage.getItem("user"))
      var position = user.position
      if(position=='系主任'){
        console.log("系主任查找教师请假记录")
        var profession = user.profession
        //默认查找该专业所有请假信息
        this.selectByProfession(profession,0)
      }
      if(position=='院长'||position=='书记'){
        console.log("院长查找教师请假记录")
        var college = user.college
        //默认查找该专业所有请假信息
        this.selectByCollege(college,0)
      }
    },
    data() {
      return {
        pageSize:8,
        total:8,
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
