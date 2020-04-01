<template>
  <div>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="processInstanceId"
      label="流程实例ID">
    </el-table-column>
    <el-table-column
      prop="taskId"
      label="任务ID">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="请假人">
    </el-table-column>
    <el-table-column
      prop="days"
      label="请假天数">
    </el-table-column>
    <el-table-column
      prop="college"
      label="学院">
    </el-table-column>
    <el-table-column
      prop="profession"
      label="专业">
    </el-table-column>
    <!--<el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>-->

    <!--审批部分-->
    <el-table-column
      fixed="right"
      label="审批"
      width="100" :resizable='false'>
      <template slot-scope="scope">
        <!--<el-button type="text" @click="dialogFormVisible = true">审批</el-button>-->
        <el-button type="text" @click="process(scope.row)">审批</el-button>
      </template>
    </el-table-column>

  </el-table>
  <!-- Form -->
  <el-dialog title="请假单审批" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="form">
      <el-form-item label="请假人" :label-width="formLabelWidth">
        <el-col :span="15">
        <el-input v-model="form.userName" disabled="disabled"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="班级" :label-width="formLabelWidth">
        <el-col :span="15">
          <el-input v-model="form.class_" disabled="disabled"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="请假天数" :label-width="formLabelWidth">
        <el-col :span="15">
        <el-input v-model="form.days" disabled="disabled"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="请假类型" :label-width="formLabelWidth">
        <el-col :span="15">
          <el-input v-model="form.vacationType" disabled="disabled"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="请假时间" prop="time">
        <el-col :span="8">
          <el-date-picker type="datetime" placeholder="开始时间" v-model="form.beginTime" style="width: 100%;" disabled="disabled"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="8">
          <el-date-picker type="datetime" placeholder="结束时间" v-model="form.endTime" style="width: 100%;" disabled="disabled"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="请假理由" :label-width="formLabelWidth">
        <el-col :span="20" >
        <el-input type="textarea" v-model="form.reason" disabled="disabled"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="审批结果">
        <el-radio-group v-model="form.checkResult">
          <el-radio label="通过"></el-radio>
          <el-radio label="拒绝"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审批意见" :label-width="formLabelWidth">
        <el-col :span="20" >
          <el-input type="textarea" v-model="form.opinion"></el-input>
        </el-col>
      </el-form-item>
     <!-- <el-form-item label="审批意见" :label-width="formLabelWidth">
        <el-input v-model="form.opinion" ></el-input>
      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="holiday_check(form)">提 交</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
  export default {
    methods:{
     /* edit(row) {
        this.$router.push({
          path:'/pageThree',
          query:{
            sid:row.sid
          }
        })
        // console.log(row);
      },*/
     holiday_check(form){
       this.dialogFormVisible = false
       console.log(form)
       console.log("从表单获得审批的流程ID为：",form.processInstanceId)
       var data = {}
    /*   data.processinstanceid = form.processInstanceId
       data.taskid = form.taskId
       data.userid = form.userId
       data.role = form.role
       console.log("从表单获得审批的角色为：",form.role)
       data.checkresult = form.checkResult
       data.opinion = form.opinion*/
       data.data = form
       this.$axios.post('http://localhost:8181/user/holiday/holidayCheck',data).then( res =>{
        console.log(res.data)
         //刷新当前页面
         window.location.reload()
       })
     },
      process(row){
        var _this = this
        var processInstanceId = row.processInstanceId
        this.$axios.get('http://localhost:8181/user/holiday/holidayTask/'+processInstanceId).then(function (resp){
          _this.form = resp.data
          _this.dialogFormVisible = true
        })
      }
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
          processInstanceId: '',
          taskId: '',
          userName: '',
          days:'',
          beginTime:'',
          endTime:'',
          createTime:'',
          vacationType:'',
          reason:'',
          college:'',
          profession:'',
          class_:''
        }],
        dialogFormVisible: false,
        form: {
          userName: 'test',
          class_:'软件1604',
          days: '2',
          beginTime: '2020-3-31 22:23:21',
          endTime: '2020-4-1 22:23:21',
          reason: 'test test',
          checkResult:'',
          opinion: ''
        },
        formLabelWidth: '120px'
      };

    }
  }
</script>
