<template>
  <div class="el-main-demo">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">转专业申请</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">申请结果</a></el-breadcrumb-item>

    </el-breadcrumb>
    <div class="el-main-table">
      <el-progress v-if="tableData[tableData.length-1].checkResult=='拒绝'" :percentage="100" aria-valuetext="审核中"></el-progress>
      <el-progress v-else-if="tableData.length==1" :percentage="20" aria-valuetext="审核中"></el-progress>
      <el-progress v-else-if="tableData.length==2" :percentage="40" aria-valuetext="审核中"></el-progress>
      <el-progress v-else-if="tableData.length==3" :percentage="60" aria-valuetext="审核中"></el-progress>
      <el-progress v-else-if="tableData.length==4" :percentage="80" aria-valuetext="审核中"></el-progress>
      <el-progress v-else-if="tableData.length==5" :percentage="100" aria-valuetext="审核中"></el-progress>
      <el-progress v-else-if="tableData[tableData.length-1].checkResult=='拒绝'" :percentage="100" aria-valuetext="审核中"></el-progress>
      <el-table
    :data="tableData"
    border :header-cell-style="{background:'#D5ECF8',color:'#606266'}"
    style="width: 100%">
    <el-table-column
      prop="processInstanceId"
      label="流程实例ID"
      width="80">
    </el-table-column>
    <el-table-column
      prop="taskId"
      label="任务ID"
      width="80">
    </el-table-column>
    <el-table-column
      prop="newCollege"
      label="转向学院"
      width="100">
    </el-table-column>
    <el-table-column
      prop="newProfession"
      label="转向专业"
      width="100">
    </el-table-column>
    <el-table-column
      prop="taskStatus"
      label="任务状态"
      width="130">
    </el-table-column>
      <el-table-column
        prop="checkResult"
        label="审批结果"
        width="50">
      </el-table-column>

      <el-table-column
      prop="opinion"
      label="审核意见">
    </el-table-column>
    <el-table-column
      prop="checkTime"
      label="审核时间"
      width="100">
    </el-table-column>
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
    created(){
      var _this = this
      const user = JSON.parse(sessionStorage.getItem("user"))
      var userId = user.sid

      this.$axios.get('http://localhost:8181/user/major/userSearch/'+userId).then(function (resp){
        console.log(resp)
        for(let i = 0;i<resp.data.length;i++){
          let checkTime = new Date(resp.data[i].checkTime)
          resp.data[i].checkTime = formatDate(checkTime, 'yyyy-MM-dd hh:mm:ss')
        }
        _this.tableData = resp.data
      })
    },
    data() {
      return {
        tableData: [{
          processInstanceId: '',
          taskId: '',
          newCollege: '',
          newProfession:'',
          checkResult:'',
          taskStatus:'',
          opinion:'',
          checkTime:''
        }]
      }
    },
    methods: {
      /*format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }*/
    }
  }
</script>
