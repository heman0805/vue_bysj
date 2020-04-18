<template>

  <div class="el-main-demo">



    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">项目立项申请</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">申请结果</a></el-breadcrumb-item>

    </el-breadcrumb>

    <div class="el-main-demo">
      <el-form :inline="true" ref="form" :model="form"  label-width="80px">

        <el-form-item label="申请结果" prop="result">
          <el-col :span="20">
            <el-select v-model="form.result" @change="change('form')" placeholder="请选择查询类型">
              <el-option label="通过" value="通过"></el-option>
              <el-option label="拒绝" value="拒绝"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
    </div>

    <div class="el-main-table">
      <el-table
        :data="tableData"
        stripe
        border :header-cell-style="{background:'#D5ECF8',color:'#606266'}"
        style="width: 100%">
        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="角色"
          prop="role">
        </el-table-column>
        <el-table-column
          label="项目名称"
          prop="projectName">
        </el-table-column>
        <el-table-column
          label="项目背景"
          prop="context">
        </el-table-column>
        <el-table-column
          prop="mean"
          label="研究意义">
        </el-table-column>
        <el-table-column
          label="预期结果"
          prop="result">
        </el-table-column>
        <el-table-column
          label="申请金额"
          prop="fund">
        </el-table-column>
        <el-table-column
          label="审批结果"
          prop="checkResult">
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

      change(form){
        console.log(this.form.result)
        var param
        if(this.form.result=='通过')
          param = 5
        else
          param=6
        var _this = this
        var profession = this.form.result
        var college = this.college
        var tid = this.tid
        //查找该专业所有班级
        this.$axios.get('http://localhost:8181/user/project/result/' + tid+"/"+college+"/"+profession+"/"+param+"/0/"+this.pageSize).then(function (resp) {
          _this.tableData = resp.data.data

        })
      },

      page(currentPage){
        console.log(this.form.result)
        var param
        if(this.form.result=='通过')
          param = 5
        else
          param=6
        const _this = this
        var tid = this.tid
        var profession=this.profession
        var college=this.college

        //查找该用户所在专业所有班级
        this.$axios.get('http://localhost:8181/user/project/result/' + tid+"/"+college+"/"+profession+"/"+param+"/"+currentPage+"/"+this.pageSize).then(function (resp) {
          console.log(resp)
          _this.tableData = resp.data.data
        })
      }
    },
    created(){
      const _this = this
      const user = JSON.parse(sessionStorage.getItem("user"))
      var tid = user.tid
      var profession=null
      var college=null
      if(user.profession!=null){
        profession = user.profession
        console.log(profession)
      }
      if(user.college!=null){
        college = user.college
        console.log(college)
      }
      this.tid = tid
      this.college = college
      this.profession = profession
        //查找该用户所在专业所有班级
        this.$axios.get('http://localhost:8181/user/project/result/' + tid+"/"+college+"/"+profession+"/5/0/"+this.pageSize).then(function (resp) {
          console.log(resp)
         _this.tableData = resp.data.data
        })
    },
    data() {
      return {
        pageSize:10,
        total:10,
        college:'',
        profession:'',
        tid:'',
        form: {
         result:''
        },
        tableData: [{
          name:'',
          role:'',
          projectName:'',
          context:'',
          mean:'',
          result:'',
          fund:'',
          checkResult:'',
        }],
      };

    }
  }
</script>
