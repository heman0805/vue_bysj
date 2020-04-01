<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="processInstanceId"
      label="流程实例ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="days"
      label="请假天数"
      width="100">
    </el-table-column>

    <el-table-column
      prop="beginTime"
      label="请假开始时间">
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="请假结束时间">
    </el-table-column>
    <el-table-column
      prop="vacationType"
      label="请假类型">
    </el-table-column>
    <el-table-column
      prop="processStatus"
      label="流程状态">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间">
    </el-table-column>
  </el-table>
</template>

<script>
  import {formatDate} from '../../js/date.js';
  export default {
    created(){
      var _this = this
      const user = JSON.parse(sessionStorage.getItem("user"))
      var role = user.role
      var userId
      if(role=="学生")
        userId = user.sid
      else
        userId = user.tid

      this.$axios.get('http://localhost:8181/user/holiday/userSearch/'+userId+'/'+role).then(function (resp){
        console.log(resp)
        for(let i = 0;i<resp.data.holiday.length;i++){
          let begintime = new Date(resp.data.holiday[i].beginTime)
          let endtime = new Date(resp.data.holiday[i].endTime)
          let createtime = new Date(resp.data.holiday[i].createTime)
          resp.data.holiday[i].beginTime = formatDate(begintime, 'yyyy-MM-dd hh:mm:ss')
          resp.data.holiday[i].endTime = formatDate(endtime, 'yyyy-MM-dd hh:mm:ss')
          resp.data.holiday[i].createTime = formatDate(createtime, 'yyyy-MM-dd hh:mm:ss')
        }
        _this.tableData = resp.data.holiday
      })
    },
    data() {
      return {
        tableData: [{
          processInstanceId: '',
          days: '',
          beginTime: '',
          endTime:'',
          vacationType:'',
          processStatus:'',
          createTime:''
        }]
      }
    },
    methods: {

    }
  }
</script>
