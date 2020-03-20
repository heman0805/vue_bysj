<template>
    <div>
      <table>
        <tr>
          <td>姓名</td>
          <td>专业</td>
          <td>班级</td>
        </tr>
        <tr v-for="item in students">
          <td>{{item.name}}</td>
          <td>{{item.profession}}</td>
          <td>{{item.class_}}</td>
        </tr>
      </table>
    </div>
</template>

<script>
    export default {
        name: "Student",
      data(){
          return{
            msg:'Hello Vue',
            students:[
              {
                name: "赫嫚",
                profession: "软件",
                class_: ""
              }
            ]
          }
      },
      created(){
          const _this = this
          this.$axios.get("http://localhost:8181/test").then(function (resp){
            console.log(resp)
            _this.students = resp.data
          })
      }
    }
</script>

<style scoped>

</style>
