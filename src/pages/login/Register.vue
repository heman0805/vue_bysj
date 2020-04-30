<template>
  <div class="backgroud">

    <el-form :inline="true"  :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px"  >
      <div  style="margin-top:70px;margin-left:-480px;width: 100%;height: 80px">
        <el-form-item label="角色">
          <el-radio-group v-model="ruleForm.role">
            <el-radio label="学生"></el-radio>
            <el-radio label="教师"></el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div style="margin-left:-130px;width: 100%">
        <el-form-item label="用户名" prop="userName" >
          <el-input v-model="ruleForm.userName" placeholder="学号/工号" ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password" >
          <el-input type="password" v-model="ruleForm.password" placeholder="登录密码"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name" >
          <el-input type="name" v-model="ruleForm.name" placeholder="真实姓名"></el-input>
        </el-form-item>
      </div>

      <div style="margin-left:-130px;width: 100%">
        <el-form-item label="性别" prop="sex" >
          <!--<el-input type="sex" v-model="ruleForm.sex" placeholder="eg：男/女"></el-input>-->
          <el-select v-model="ruleForm.sex" placeholder="---请选择性别---">
            <el-option label="男" value="男"/>
            <el-option label="女" value="女"/>
          </el-select>
        </el-form-item>

        <el-form-item label="学院" prop="college" >
          <!--<el-input type="college" v-model="ruleForm.college" placeholder="eg:计算机学院"></el-input>-->
          <el-select v-model="ruleForm.college" @change="collegeChange('ruleForm')" placeholder="---请选择学院---">
            <el-option v-for="item in college" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专业" prop="profession" >
          <!--<el-input type="profession" v-model="ruleForm.profession" placeholder="eg:软件工程"></el-input>-->
          <el-select v-model="ruleForm.profession" @change="professionChange('ruleForm')" placeholder="---请选择专业---">
            <el-option v-for="item in profession" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div style="margin-left:-115px;width: 100%">
        <el-form-item label="班级" prop="class_" >
          <!--<el-input type="class_" v-model="ruleForm.class_" placeholder="eg:软件1604"></el-input>-->
          <el-select v-model="ruleForm.class_" @change="classChange('ruleForm')" placeholder="---请选择班级---">
            <el-option v-for="item in classes" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级" prop="grade" >
          <!--<el-input type="grade" v-model="ruleForm.grade" placeholder="eg:1/2/3/4"></el-input>-->
          <el-select v-model="ruleForm.grade" placeholder="---学生请选择年级---">
            <el-option label="大一" value="1"/>
            <el-option label="大二" value="2"/>
            <el-option label="大三" value="3"/>
            <el-option label="大四" value="4"/>
          </el-select>
        </el-form-item>

        <el-form-item label="职位" prop="position" >
         <!-- <el-input type="position" v-model="ruleForm.position" placeholder="辅导员/系主任/书记/院长/副院长"></el-input>-->
          <el-select v-model="ruleForm.position" placeholder="---教师请选择职位---">
            <el-option label="辅导员" value="辅导员"/>
            <el-option label="系主任" value="系主任"/>
            <el-option label="书记" value="书记"/>
            <el-option label="副院长" value="副院长"/>
            <el-option label="院长" value="院长"/>
            <el-option label="教师" value="教师"/>
            <el-option label="学校教务办" value="学校教务办"/>
            <el-option label="学院教务办" value="学院教务办"/>
            <el-option label="科技处" value="科技处"/>
            <el-option label="财务处" value="财务处"/>
          </el-select>
        </el-form-item>
      </div>

      <div style="margin-left:-450px;width: 100%">
        <el-form-item>
          <el-button type="primary" @click="register('ruleForm')">注册</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "Register",
      data(){
        return{
          ruleForm: {
            userName: '',
            password: '',
            name:'',
            sex:'',
            college:[
              {value:'计算机学院',label:'计算机学院'}
            ],
            profession:[
              {value:'计算机学院',label:'计算机学院'}
            ],
            class_:[
              {value:'计算机学院',label:'计算机学院'}
            ],
            grade:'',
            position:'',
            role:''
          },
          college:[
            ''
          ],
          classes:[
            ''
          ],
          profession:[
            ''
          ],
          rules: {
            username: [
              { required: true, message: '用户名不能为空', trigger: 'blur' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '密码不能为空', trigger: 'blur' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            role:[
              { required: true, message: '角色不能为空' },
              // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          },

        }
      },
      methods:{
        register (ruleForm){
          var _this = this
          var data ={};
          data.user = this.ruleForm
          console.log(data)
          this.$axios.post('http://localhost:8181/register',data).then( res => {
            console.log(res)
            if(res.data=='注册成功')
              _this.$message(res.data)
            else
              _this.$message.error(res.data)
            _this.$refs[ruleForm].resetFields()
          })
        },
        collegeChange(ruleForm){
          var _this = this
          console.log('当前学院',this.ruleForm.college)
          //后台查询所有学院名称并设置
          this.$axios.get('http://localhost:8181/searchProfessionesByCollege/'+this.ruleForm.college).then(function (resp) {
            console.log(resp)
            _this.profession = resp.data
          })
        },
        professionChange(ruleForm){
          var _this = this
          console.log('当前学院',this.ruleForm.profession)
          //后台查询所有学院名称并设置
          this.$axios.get('http://localhost:8181/searchclassesByProfession/'+this.ruleForm.profession).then(function (resp) {
            console.log(resp)
            _this.classes = resp.data
          })
        },
        classChange(ruleForm){

        }
      },
      created(){
        var _this = this
          //后台查询所有学院名称并设置
        this.$axios.get('http://localhost:8181/searchAllCollege').then(function (resp) {
         console.log(resp)
          _this.college = resp.data
        })
      }
    }

</script>

<style scoped>
  .backgroud{
    background-image: url("../../picture/login.png");
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    min-width: 1000px;
    z-index:-10;
    zoom: 1;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    z-index: -1;
  }
  .registerForm{
    width: 40%;
  }
</style>
