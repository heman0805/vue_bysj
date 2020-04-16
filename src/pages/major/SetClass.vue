<template>

  <div class="el-main-demo">



    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">待办任务</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">班级分配</a></el-breadcrumb-item>

    </el-breadcrumb>

    <div class="el-main-demo">
      <el-form :inline="true" ref="form" :model="form"  label-width="80px">

        <el-form-item label="专业" prop="profession">
          <el-col :span="20">
            <el-select v-model="form.profession" @change="change('form')" placeholder="请选择专业">
              <el-option v-for="item in profession" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button  :plain="true" type="primary" round @click="submit('form')">提交分班结果</el-button>
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
          prop="name"
          >
        </el-table-column>
        <el-table-column
          label="性别"
          prop="sex"
           >
        </el-table-column>
        <el-table-column
          label="学号"
          prop="number"
           >
        </el-table-column>
        <el-table-column
          label="学院"
          prop="newCollege"
        >
        </el-table-column>
        <el-table-column
          label="专业"
          prop="newProfession"
           >
        </el-table-column>
        <el-table-column
          prop="gpa"
          label="gpa"
           >
        </el-table-column>

        <el-table-column label="班级" prop="newClass_" >
          <template scope="scope">
            <el-select v-model="scope.row.newClass_" placeholder="请选择班级">
              <el-option v-for="(item,index) in classes" :key="item" :label="item" :value="item" />
            </el-select>
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
        var _this = this
        var profession = this.form.profession
        //查找该专业所有班级
        this.$axios.get('http://localhost:8181/user/holiday/classes/' + profession).then(function (resp) {
          _this.classes = resp.data
        })
        this.$axios.get('http://localhost:8181/user/major/getByProfession/' + profession+"/profession/0/10").then(function (resp) {
          _this.tableData = resp.data.data
        })
      },
      submit(form){
        var _this = this
        console.log(this.tableData)
        this.$axios.post('http://localhost:8181/user/major/setClass',this.tableData).then(function (resp) {
          _this.$message(resp)
          window.location.reload()
        })
      },
      page(currentPage){
        var _this = this
        const user = JSON.parse(sessionStorage.getItem("user"))
        var college = user.college
        if(this.form.profession!=null){
          var profession = this.form.profession
          this.$axios.get('http://localhost:8181/user/major/getByProfession/' + profession+"/profession/"+currentPage+"/"+this.pageSize).then(function (resp) {
            _this.tableData = resp.data.data
            _this.pageSize = resp.data.size
            _this.total = resp.data.totalElement
          })
        }
        else{
          this.$axios.get('http://localhost:8181/user/major/getByProfession/' + college+"/college/"+currentPage+"/"+this.pageSize).then(function (resp) {
            _this.tableData = resp.data.data
            _this.pageSize = resp.data.size
            _this.total = resp.data.totalElement
          })
        }



        }
    },
    created(){
      const _this = this
      const user = JSON.parse(sessionStorage.getItem("user"))
      var college = user.college
      var profession

      this.$axios.get('http://localhost:8181/user/holiday/profession/'+college).then(function (resp) {
        _this.profession = resp.data
        profession = resp.data[0]
      })
      this.$axios.get('http://localhost:8181/user/major/getByProfession/' + college+"/college/0/10").then(function (resp) {
        for (let i=0;i<resp.data.data.length;i++){
          _this.index = i
        }
        _this.tableData = resp.data.data
        _this.pageSize = resp.data.size
        _this.total = resp.data.totalElement
      })


    },
    data() {
      return {
        pageSize:10,
        total:8,
        form: {
          class_:''
        },
        classes:[
          ''
        ],
        profession:[
          ''
        ],
        tableData: [{

          name:'',
          sex:'',
          number:'',
          newCollege:'',
          profession:'',
          gpa:'',
          newClass_:[
            {value:'软件1604',label:'1604'},
            {value:'软件1603',label:'1603'}
          ],
        }],
      };

    }
  }
</script>
