<template>
  <div>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="sid"
        label="Sid"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="profession"
        label="专业"
        width="120">
      </el-table-column>
      <el-table-column
        prop="class_"
        label="班级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="年级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="tid"
        label="教师"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteStudent(scope.row)" type="text" size="small">删除</el-button>
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
</template>

<script>
  export default {
    methods: {
      deleteStudent(row){
        const _this = this
        this.$axios.get('http://localhost:8181/student/studentDelete/'+row.sid).then(function (resp){
          _this.$alert('删除学生信息成功', '成功', {
            confirmButtonText: '确定',
            callback: action => {
              //刷新当前页面
              window.location.reload()
              //_this.$router.push('/pageOne')

            }
          })
        })
      },
      edit(row) {
        this.$router.push({
          path:'/pageThree',
          query:{
            sid:row.sid
          }
        })
        // console.log(row);
      },
      page(currentPage){
        const _this = this
        this.$axios.get('http://localhost:8181/test/'+(currentPage)+'/8').then(function (resp){
          console.log(resp)
          _this.tableData = resp.data.data
          _this.pageSize = resp.data.size
          _this.total = resp.data.totalElement
        })
      }

    },
    created(){
      const _this = this
      this.$axios.get('http://localhost:8181/test/0/8').then(function (resp){
        console.log("跳转后页面获取token:"+window.sessionStorage.eleToken)
        var user = JSON.parse(sessionStorage.getItem("user"))
        console.log("跳转后页面获取用户:"+user.username)
        console.log(resp)
        _this.tableData = resp.data.data
        _this.pageSize = resp.data.size
        _this.total = resp.data.totalElement
      })
    },
    data() {
      return {
        pageSize:'1',
        total:'11',
        tableData: [{
          sid: 1,
          name: '王小虎',
          profession: '软件工程',
          class_: '软件1604',
          username:'',
          password:'',
          grade:'',
          tid:''
        }]
      }
    }
  }
</script>
