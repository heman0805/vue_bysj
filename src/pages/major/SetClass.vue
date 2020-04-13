<template>

  <div class="el-main-demo">



    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">请假申请</el-breadcrumb-item>
      <el-breadcrumb-item><a href="">学生请假记录</a></el-breadcrumb-item>

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
          label="专业"
          prop="newProfession"
           >
        </el-table-column>
        <el-table-column
          prop="gpa"
          label="gpa"
           >
        </el-table-column>

        <el-table-column label="班级" prop="class_" >
          <template scope="scope">
            <el-select v-model="scope.row.class_" placeholder="请选择班级">
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
        this.$axios.get('http://localhost:8181/user/major/getByProfession/' + profession+"/0/10").then(function (resp) {
          console.log(resp)
          _this.tableData = resp.data.data
        })
      },
      submit(form){

       /* var class_ = this.form.class_
        const user = JSON.parse(sessionStorage.getItem("user"))
        var tid = user.tid
        var profession = this.form.profession
        if(!(class_==null)){
          this.selectByClass_(tid,0,class_)
        }
        else if(!(profession==null)){
          this.selectByProfession(tid,0,profession)
        }*/

      },
      page(currentPage){
        /*const user = JSON.parse(sessionStorage.getItem("user"))
        var tid = user.tid
        if(!(this.form.class_==null)&&this.form.class_.length>1){
          this.selectByClass_(tid,currentPage,this.form.class_)
        }
        else if(!(this.form.profession==null)&&this.form.profession.length>1){
          this.selectByProfession(tid,currentPage,this.form.profession)
        }else{
          const user = JSON.parse(sessionStorage.getItem("user"))
          var tid = user.tid
          var college = user.college
          if(user.position=='辅导员'||user.position=='系主任') {
            this.selectByProfession(tid,currentPage,this.form.profession)
          }else if(user.position=='书记'||user.position=='院长') {
            this.selectByCollege(tid,currentPage,college)
          }
        }*/
      }
    },
    created(){
      const _this = this
      const user = JSON.parse(sessionStorage.getItem("user"))
      var college = user.college
      var profession = '通信工程'

      this.$axios.get('http://localhost:8181/user/holiday/profession/'+college).then(function (resp) {
        console.log(resp)
        _this.profession = resp.data
      })
      this.$axios.get('http://localhost:8181/user/major/getByProfession/' + profession+"/0/10").then(function (resp) {
        console.log(resp)
        for (let i=0;i<resp.data.data.length;i++){
          _this.index = i
        }
        _this.tableData = resp.data.data
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
          profession:'',
          gpa:'',
          class_:[
            {value:'软件1604',label:'1604'},
            {value:'软件1603',label:'1603'}
          ],
        }],
      };

    }
  }
</script>
