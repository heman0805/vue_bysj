import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../views/Home'
import Student from '../views/Student'
import PageOne from '../views/pageOne'
import PageTwo from '../views/pageTwo'
import PageThree from '../views/pageThree'
import PageFour from '../views/pageFour'
import Index from '../views/index'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: '学生信息',
      show:true,
      component: Index,
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
      path: '/',
      name: '导航2',
      show:false,
      component: Index,
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
    },







    {
      path: '/home',
      name: 'home',
      show:false,
      component: Home
},
    {
      path: '/student',
      name: 'student',
      show:false,
      component: Student
    }
  ]
})
