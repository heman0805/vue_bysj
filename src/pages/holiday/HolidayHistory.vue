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
          label="开始时间"
          prop="beginTime">
        </el-table-column>

        <el-table-column
          label="结束时间"
          prop="endTime">
        </el-table-column>
        <el-table-column
          prop="days"
          label="请假天数">
        </el-table-column>
        <el-table-column
          label="请假类型"
          prop="vacationType">
        </el-table-column>
        <el-table-column
          label="请假理由"s
          prop="reason">
        </el-table-column>
        <el-table-column
          lable="审批结果"
          prop="checkResult">
        </el-table-column>
          <el-table-column
            lable="审批意见"
            prop="opinion">
          </el-table-column>
      </el-table>
      </div>
  </div>
</template>
<style>
  @import "../../style/el-main-demo.css";
</style>
<script>
  export default {
    methods:{
    },
    created(){
      const _this = this
      const user = JSON.parse(sessionStorage.getItem("user"))

      var userId = user.tid

      this.$axios.get('http://localhost:8181/user/holiday/teacherSearch/'+userId).then(function (resp){
        _this.tableData = resp.data.holidayTasks
      })
    },
    data() {
      return {
        tableData: [{
          days:'',
          beginTime:'',
          endTime:'',
          createTime:'',
          vacationType:'',
          reason:'',
          checkResult:'',
          opinion:''
        }],
      };

    }
  }
</script>
