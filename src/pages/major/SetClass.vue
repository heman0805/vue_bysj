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

        <el-form-item label="年级" prop="grade">
          <el-col :span="20">
            <el-select v-model="form.grade" @change="gradeChange('form')" placeholder="请选择年级">
              <el-option label="大一" value="1"/>
              <el-option label="大二" value="2"/>
              <el-option label="大三" value="3"/>
              <el-option label="大四" value="4"/>
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
        var grade = this.form.grade

        if(this.form.grade==null||this.form.grade=="")
          grade=10

        //查找该专业所有班级
        this.$axios.get('http://localhost:8181/searchclassesByProfessionAndGrade/' + profession+"/"+grade).then(function (resp) {
          _this.classes = resp.data
        })
        this.$axios.get('http://localhost:8181/user/major/getByProfession/' + profession+"/profession/"+grade+"/0/"+this.pageSize).then(function (resp) {
          _this.tableData = resp.data.data
          _this.pageSize = resp.data.size
          _this.total = resp.data.totalElement
        })
      },
      gradeChange(form){
        console.log(this.form.grade)
        var _this = this
        var profession = this.form.profession
        var grade = this.form.grade
        if(this.form.grade==null||this.form.grade=="")
          grade=10
        console.log("年级：",grade)
        if(profession!=null&&profession!="") {
          //查找该专业所有班级
          this.$axios.get('http://localhost:8181/searchclassesByProfessionAndGrade/' + profession+"/"+grade).then(function (resp) {
            _this.classes = resp.data
          })
          this.$axios.get('http://localhost:8181/user/major/getByProfession/' + profession + "/profession/" + grade + "/0/"+this.pageSize).then(function (resp) {
            _this.tableData = resp.data.data
            _this.pageSize = resp.data.size
            _this.total = resp.data.totalElement
          })
        }
      },
      submit(form){
        var _this = this
        console.log(this.tableData)
        this.$axios.post('http://localhost:8181/user/major/setClass',this.tableData).then(function (resp) {
          _this.$message(resp.data)
          window.location.reload()
        })
      },
      page(currentPage){
        var _this = this
        const user = JSON.parse(sessionStorage.getItem("user"))
        var college = user.college
        var grade = this.form.grade

        if(this.form.grade==null||this.form.grade=="")
          grade=10

        console.log("年级：",grade)
        if(this.form.profession!=null&&this.form.profession!=""){
          var profession = this.form.profession
          this.$axios.get('http://localhost:8181/user/major/getByProfession/' + profession+"/profession/"+grade+"/"+currentPage+"/"+this.pageSize).then(function (resp) {
            _this.tableData = resp.data.data
            _this.pageSize = resp.data.size
            _this.total = resp.data.totalElement
          })
        }
        else{
          this.$axios.get('http://localhost:8181/user/major/getByProfession/' + college+"/college/"+grade+"/"+currentPage+"/"+this.pageSize).then(function (resp) {
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
      this.$axios.get('http://localhost:8181/searchProfessionesByCollege/'+college).then(function (resp) {
        _this.profession = resp.data
      })
      this.$axios.get('http://localhost:8181/user/major/getByProfession/' + college+"/college/10/0/"+_this.pageSize).then(function (resp) {
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
          class_:'',
          grade:''
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
