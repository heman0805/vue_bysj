<template>
  <div class="el-main-demo">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">查看</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">转专业结果</a></el-breadcrumb-item>

    </el-breadcrumb>
    <div class="el-main-table">

          <a :href="'http://localhost:8181/template?college=' + this.college "
             style="color:#42b983;font-size:16px;display: block;text-align: right;">
             下载结果
          </a>

      <el-table
        :data="tableData"
        border :header-cell-style="{background:'#D5ECF8',color:'#606266'}"
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="学生姓名">
        </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
        </el-table-column>
          <el-table-column
            prop="number"
            label="学号">
          </el-table-column>
        <el-table-column
          prop="currentProfession"
          label="原专业">
        </el-table-column>
            <el-table-column
              prop="currentClass"
              label="原班级">
            </el-table-column>
        <el-table-column
          prop="newProfession"
          label="现专业">
        </el-table-column>
            <el-table-column
              prop="newClass_"
              label="新班级">
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
  export default {
    methods:{
      page(currentPage){
        const _this = this
        const user = JSON.parse(sessionStorage.getItem("user"))
        var college
        var group = user.group
        if(group=='Group_AcademicAffairs'){
          college = user.profession
        }
        this.$axios.get('http://localhost:8181/user/major/result/'+college+"/"+currentPage+"/"+this.pageSize).then(function (resp){
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
      var college
      var group = user.group

      if(group=='Group_AcademicAffairs'){
        console.log(group)
        college = user.college
      }
      else{
        college=null
        console.log(college)
      }
      this.college = college
      this.$axios.get('http://localhost:8181/user/major/result/'+college+"/0/"+this.pageSize).then(function (resp){
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
          name: '',
          sex:'',
          number:'',
          currentProfession:'',
          currentClass:'',
          newProfession:'',
          newClass_:'',
        }],
        role:'',
        college:''
      };

    }
  }
</script>
