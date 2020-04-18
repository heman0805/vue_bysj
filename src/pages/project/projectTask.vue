<template>
  <div class="el-main-demo">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">待办任务</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">项目申请审批</a></el-breadcrumb-item>

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
          prop="profession"
          label="专业">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="fund"
          label="申请资金">
        </el-table-column>
        <el-table-column
          prop="mean"
          label="研究意义">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="申请时间">
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
      <el-dialog title="项目立项申请审批" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="申请人" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input v-model="form.name" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input v-model="form.projectName" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="项目背景" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input type="text" v-model="form.context" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item  label="研究意义" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input v-model="form.mean" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="预期结果" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input v-model="form.result" disabled="disabled"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="申请资金详细条目" :label-width="formLabelWidth">
            <el-col :span="15">
              <el-input v-model="form.fundItem" disabled="disabled"></el-input>
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
  import {formatDate} from '../../js/date.js';
  export default {
    methods:{
      holiday_check(form){
        this.dialogFormVisible = false
        var data = {}
        data.data = form
        console.log(data)
        this.$axios.post('http://localhost:8181/user/project/projectCheck',data).then( res =>{
          console.log(res.data.msg)
          //刷新当前页面
          window.location.reload()
        })
      },
      process(row){
        var _this = this
        this.form = row
        _this.dialogFormVisible = true
       /* var processInstanceId = row.processInstanceId
        this.$axios.get('http://localhost:8181/user/major/searchByProcessInstanceId/'+processInstanceId).then(function (resp){
          //console.log(resp.data)
          _this.form = resp.data
          _this.role = resp.data.role
          _this.dialogFormVisible = true
        })*/
      },
      page(currentPage){
        const _this = this
        const user = JSON.parse(sessionStorage.getItem("user"))
        var userId = user.tid
        console.log("登录用户ID:",userId)
        this.$axios.get('http://localhost:8181/user/project/search/'+userId+"/"+currentPage+"/"+this.pageSize).then(function (resp){
          console.log(resp.data)
          for(let i = 0;i<resp.data.data.length;i++){
            let createTime = new Date(resp.data.data[i].createTime)
            resp.data.data[i].createTime = formatDate(createTime, 'yyyy-MM-dd hh:mm:ss')
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
      var userId = user.tid
      console.log("登录用户ID:",userId)
      this.$axios.get('http://localhost:8181/user/project/search/'+userId+"/0/"+this.pageSize).then(function (resp){
        console.log(resp.data)
        for(let i = 0;i<resp.data.data.length;i++){
          let createTime = new Date(resp.data.data[i].createTime)
          resp.data.data[i].createTime = formatDate(createTime, 'yyyy-MM-dd hh:mm:ss')
        }
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
          profession:'',
          projectName:'',
          fund:'',
          mean:'',
          createTime:'',

          context:'',
          result:'',
          fundItem: '',
          checkResult:'',
          opinion: ''
        }],
        dialogFormVisible: false,
        form: {
          name: '',
          projectName:'',
          context:'',
          mean:'',
          result:'',
          fundItem: '',
          checkResult:'',
          opinion: ''
        },
        formLabelWidth: '120px',
        role:''
      };

    }
  }
</script>
