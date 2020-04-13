<template>
  <div class="el-main-demo">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">待办任务</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">转专业审批</a></el-breadcrumb-item>

    </el-breadcrumb>
    <div class="el-main-table">
      <el-table
        :data="tableData"
        border :header-cell-style="{background:'#D5ECF8',color:'#606266'}"
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
          prop="name"
          label="申请人">
        </el-table-column>
        <el-table-column
          prop="currentProfession"
          label="当前专业">
        </el-table-column>
        <el-table-column
          prop="newCollege"
          label="拟转向学院">
        </el-table-column>
        <el-table-column
          prop="newProfession"
          label="拟转向专业">
        </el-table-column>
        <el-table-column
          prop="gpa"
          label="GPA">
        </el-table-column>
        <el-table-column
          prop="rank"
          label="专业排名">
        </el-table-column>

        <!--审批部分-->
        <el-table-column
          fixed="right"
          label="审批"
          width="100" :resizable='false'>
          <template slot-scope="scope">
            <el-link type="primary" @click="process(scope.row)">审批<i class="el-icon-view el-icon--right"></i> </el-link>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :pageSize="pageSize"
        :total="total"
        @current-change="page">
      </el-pagination>
      <!-- Form -->
      <el-dialog title="转专业审批" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="申请人" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input v-model="form.name" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="拟转向专业" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input v-model="form.newProfession" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item  label="班级" :label-width="formLabelWidth" v-if="role=='学生'">
            <el-col :span="15">
              <el-input v-model="form.class_" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="班内职位" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input type="text" v-model="form.post" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="gpa" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input v-model="form.gpa" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="专业排名" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input v-model="form.rank" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="申请理由" :label-width="formLabelWidth">
            <el-col :span="20" >
              <el-input type="textarea" v-model="form.reason" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="参与比赛" :label-width="formLabelWidth">
            <el-col :span="20" >
              <el-input type="textarea" v-model="form.contest" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="参与社团及职位":label-width="formLabelWidth">
            <el-col :span="20">
              <el-input type="textarea" v-model="form.society" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="审批结果">
            <el-radio-group v-model="form.checkResult" size="mini">
              <el-radio label="通过" border>通过</el-radio>
              <el-radio label="拒绝" border>拒绝</el-radio>
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
          <el-button round @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" round @click="holiday_check(form)">提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style>
  @import "../../style/el-main-demo.css";
</style>
<script>
  export default {
    methods:{
      holiday_check(form){
        console.log(form)
        this.dialogFormVisible = false
        var data = {}
        data.data = form
        this.$axios.post('http://localhost:8181/user/major/majorCheck',data).then( res =>{
          console.log(res.data)
          //刷新当前页面
          window.location.reload()
        })
      },
      process(row){
        var _this = this
        var processInstanceId = row.processInstanceId
        this.$axios.get('http://localhost:8181/user/major/searchByProcessInstanceId/'+processInstanceId).then(function (resp){
          //console.log(resp.data)
          _this.form = resp.data
          _this.role = resp.data.role
          _this.dialogFormVisible = true
        })
      },
      page(currentPage){
        var _this = this
        const user = JSON.parse(sessionStorage.getItem("user"))
        var userId= user.tid
        this.$axios.get('http://localhost:8181/user/major/search/'+userId+"/"+currentPage+"/"+this.pageSize).then(function (resp){
          console.log(resp)
          _this.tableData = resp.data.data
          _this.pageSize = resp.data.size
          _this.total = resp.data.totalElement
        })
      }
    },
    created(){
      const _this = this
      const user = JSON.parse(sessionStorage.getItem("user"))
      var userId = user.tid
      console.log("登录用户ID:",userId)
      this.$axios.get('http://localhost:8181/user/major/search/'+userId+"/0/"+this.pageSize).then(function (resp){
        console.log(resp)
        _this.tableData = resp.data.data
        _this.pageSize = resp.data.size
        _this.total = resp.data.totalElement
      })
    },

    data() {
      return {
        pageSize:10,
        total:10,
        tableData: [{
          processInstanceId: '',
          taskId: '',
          name: '',
          currentProfession:'',
          newProfession:'',
          newCollege:'',
          gpa:'',
          rank:''
        }],
        dialogFormVisible: false,
        form: {
          name: 'test',
          newProfession:'',
          class_:'软件1604',
          post:'',
          society:'',
          gpa: '2',
          rank: '',
          reason: '',
          contest: '',
          checkResult:'',
          opinion: ''
        },
        formLabelWidth: '120px',
        role:''
      };

    }
  }
</script>
