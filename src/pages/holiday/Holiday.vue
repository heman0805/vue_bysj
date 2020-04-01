<template>
  <div>
    <div>
      <el-form   ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="请假天数" prop="days">
          <el-col :span="5">
            <el-input v-model="form.days"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="请假类型" prop="vacationType">
          <el-col :span="5">
            <el-select v-model="form.vacationType" placeholder="请选择请假类型">
              <el-option label="事假" value="事假"></el-option>
              <el-option label="病假" value="病假"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="请假时间" prop="time">
          <el-col :span="5">
            <el-date-picker type="datetime" placeholder="开始时间" v-model="form.beginTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="5">
            <el-date-picker type="datetime" placeholder="结束时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>



        <el-form-item label="请假理由" prop="reason">
          <el-col :span="15">
            <el-input type="textarea" v-model="form.reason"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('form')">提交申请</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
          </div>
  </div>
</template>
<script>
  import {formatDate} from '../../js/date.js';
  export default {
    data() {
      return {
        form: {
          days: '',
          vacationType: '',
          beginTime: '',
          endTime: '',
          reason: ''
        }
        ,
        rules: {
          days: [
            {required: true, message: '请假天数不能为空', trigger: 'blur'},
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          vacationType: [
            {required: true, message: '请假类型不能为空', trigger: 'blur'},
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         /* time: [
            {required: true, message: '请假时间不能为空', trigger: 'blur'},
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],*/
          reason: [
            {required: true, message: '请假理由不能为空', trigger: 'blur'},
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submit(form) {
        var data ={};
        let beginTime = new Date(this.form.beginTime);
        let endTime = new Date(this.form.endTime);

        this.form.beginTime = formatDate(beginTime, 'yyyy-MM-dd hh:mm:ss')
        this.form.endTime = formatDate(endTime, 'yyyy-MM-dd hh:mm:ss')
        console.log("转换后开始时间："+this.form.beginTime);
        console.log("转换后结束时间："+this.form.endTime);

        data.form = this.form
        data.user = JSON.parse(sessionStorage.getItem("user"))
        console.log("请假用户信息："+data.user)
        this.$axios.post('http://localhost:8181/user/holiday/insert',data).then(function (resp) {
          //console.log(this.map.get("form"))
          this.$message.success("请假单填写成功")
        })

      }
    }
  }
</script>
