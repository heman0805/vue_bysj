<template>

  <el-form  label-position="left":inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">


    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="专业" prop="name">
      <el-input v-model="ruleForm.profession"></el-input>
    </el-form-item>
    <el-form-item label="班级" prop="name">
      <el-input v-model="ruleForm.class_"></el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="name">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="年级" prop="name">
      <el-input v-model="ruleForm.grade"></el-input>
    </el-form-item>
    <el-form-item label="教师" prop="name" style="width: 100%">
      <el-input v-model="ruleForm.tid"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          profession: '',
          class_: '',
          username: '',
          password: '',
          grade: '',
          tid: ''
        },
        rules: {
          name: [
            { required: true, message: '该信息不能为空', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('http://localhost:8181/student/update',this.ruleForm).then(function (resp) {
              if(resp.data == 'success'){
                _this.$alert('修改学生信息成功', '成功', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$router.push('/pageOne')
                  }
                })
                // _this.$message('添加成功')
              }

            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    },
    created(){
      const _this = this
      this.$axios.get('http://localhost:8181/student/selectById/'+this.$route.query.sid).then(function (resp) {
        _this.ruleForm = resp.data
      })
    }
  }
</script>
