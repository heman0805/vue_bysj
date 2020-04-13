<template>
  <div class="el-main-demo">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">请假申请</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">个人申请记录</a></el-breadcrumb-item>

    </el-breadcrumb>
    

    <div class="el-main-table">
      <el-table
        :data="tableData"
        border :header-cell-style="{background:'#D5ECF8',color:'#606266'}"
        stripe
        style="width: 100%">
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
            label="审批意见"
            prop="opinion">
          </el-table-column>
        <el-table-column
          label="审批结果"
          prop="checkResult"
          width="80px">
        </el-table-column>
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
        var _this = this
        const user = JSON.parse(sessionStorage.getItem("user"))
        var role = user.role
        var userId
        if(role=="学生")
          userId = user.sid
        else
          userId = user.tid
        this.$axios.get('http://localhost:8181/user/holiday/holidayHistory/'+userId+"/"+role+"/"+currentPage+"/"+this.pageSize).then(function (resp){
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
      const _this = this
      const user = JSON.parse(sessionStorage.getItem("user"))

      var role = user.role
      var userId
      if(role=="学生")
        userId = user.sid
      else
        userId = user.tid

      console.log("登录用户：",userId)
      this.$axios.get('http://localhost:8181/user/holiday/holidayHistory/'+userId+"/"+role+"/0/"+this.pageSize).then(function (resp){
        console.log(resp)
        if(resp.data.data!=null) {
          for (let i = 0; i < resp.data.data.length; i++) {
            let begintime = new Date(resp.data.data[i].beginTime)
            let endtime = new Date(resp.data.data[i].endTime)
            resp.data.data[i].beginTime = formatDate(begintime, 'yyyy-MM-dd hh:mm:ss')
            resp.data.data[i].endTime = formatDate(endtime, 'yyyy-MM-dd hh:mm:ss')
          }
        }
        _this.tableData = resp.data.data
        _this.pageSize = resp.data.size
        _this.total = resp.data.totalElement
      })
    },
    data() {
      return {
        pageSize:8,
        total:8,
        tableData: [{
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
