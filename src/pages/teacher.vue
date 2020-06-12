<template>



  <div id="app">
    <el-container>
      <el-header>
        <div class="backgroud">

          <div style="position:fixed;left:-30px;top:10px; width:50%;height:30%">
            <img src="../picture/logo.png" style="margin-top:-3px;margin-left: 0px" />
            <span id="xtmc" >高校信息化平台工作流管理子系统</span>
          </div>

          <div style = "position:absolute;right:20px;" >
            <p>
              <span class="studentSpan" >姓名：{{name}} ， 职位：{{position}} ， 专业：{{profession}}

              </span>
            </p>

          </div>

        </div>
      </el-header>

      <el-container  style=" height:100%; border: 1px solid #eee" >
        <el-aside class ="aside" width="200px" style="height: 100%" ><!-- style="background-color: #4F9E66"-->
          <el-menu class ="aside" router :default-openeds="['0']">
            <el-submenu class ="aside-submenu" v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show==role">
              <template slot="title"><i class="el-icon-s-cooperation"></i>{{item.name}}</template>
              <el-menu-item class ="aside-item" v-for="(item2,index2) in item.children":index="item2.path"
                            :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  /*
	找到html标签、body标签，和挂载的标签
	都给他们统一设置样式
*/
  html,body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }

  .backgroud{
    background-image: url("../picture/v.jpg");
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
  .studentSpan{
    color:black;
  }
  .aside{
    background-color: #e5e5e5 ;
  }
  .aside-submenu{
    background-color: #e5e5e5;
  }
  .aside-item{
    background-color: #f9f9f9 ;
  }
  #xtmc{
    font-size: 25px;
    position:relative;
    top: -10px;
    left: 5px;
  }
</style>

<script>
  export default {
    created(){
      var user = JSON.parse(sessionStorage.getItem("user"))
      this.role = user.role
      this.class_ = user.class_
      this.profession = user.profession
      this.name = user.name
      this.position = user.position
    },
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        role:'',
        profession:'',
        name:'',
        position:''
      }
    }
  };
</script>

<!--


<template>

  <div id="app">

    <el-header>
      <div class="backgroud"/>

    </el-header>

    <el-container style="height: 100%; border: 1px solid #eee" >
      <el-aside width="200px" >&lt;!&ndash; style="background-color: #4F9E66"&ndash;&gt;
        <el-menu router :default-openeds="['1']">
          <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show==role">
            <template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
            <el-menu-item v-for="(item2,index2) in item.children":index="item2.path"
                          :class="$route.path==item2.path?'is-active':''">{{item2.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<style>
  .el-header {
    //background-color: #B3C0D1;
    color: #333;
    //line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .backgroud{
    backgro und-image: url("");
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:20%;
    min-width: 1000px;
    /* z-index:-10;
     zoom: 1;
     background-color: #fff;
     background-repeat: no-repeat;
     background-size: cover;
     -webkit-background-size: cover;
     -o-background-size: cover;
     background-position: center 0;
     z-index: -1;*/
  }

</style>

<script>
  export default {
    created(){
      var user = JSON.parse(sessionStorage.getItem("user"))
      var role = user.role
      console.log("初始化操作，用户角色为:",role)
      this.role = role
    },
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        role:''
      }
    }
  };
</script>
-->
