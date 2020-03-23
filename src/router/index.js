import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../views/Home'
import Student from '../views/Student'
import PageOne from '../views/pageOne'
import PageTwo from '../views/pageTwo'
import PageThree from '../views/pageThree'
import PageFour from '../views/pageFour'
import index from '../views/index'


import Index from '../pages/Index'
import Login from '../pages/login/Login'
import Register from  '../pages/login/Register'
import NotFound from '../pages/404'
import store from '../store'
Vue.use(Router)

const router = new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: '/404',
      component: NotFound
    },

    {
      path: '/student',
      name: '学生信息',
      show:true,
      component: index,
      redirect:"/pageOne",
      children: [
      {
        path: '/pageOne',
        name: '查询学生信息',
        component: PageOne
      },
      {
        path: '/pageTwo',
        name: '增加学生信息',
        component: PageTwo
      }
      ]
    },

    {
      path: '/student',
      name: '导航2',
      show:false,
      component: index,
      children: [
        {
          path: '/pageThree',
          name: '页面三',
          component: PageThree
        },
        {
          path: '/pageFour',
          name: '页面四',
          component: PageFour
        }
      ]
    }


  ]
})

// 页面刷新时，重新赋值token
/*if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}*/

/*
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {           //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})*/

/*路由守卫   根据登录获得token*/
router.beforeEach((to,from,next) =>{
  console.log("进入拦截方法")
  const isLogin = localStorage.getItem("eleToken") ? true :false ;
  const login = sessionStorage.getItem("eleToken")? true :false ;
  const  log = window.sessionStorage.getItem("eleToken")? true :false ;
  console.log(login+'isLogin='+login)
  if(to.path ==="/" || to.path ==="/register"){
    console.log("path=='/'||path=='/register'")
    next();
  }else{
    console.log("进入跳转")
    next();
   // login ? next() :next("/") ;  /*真跳转  假注册*/
  }
})
;
export default router;





