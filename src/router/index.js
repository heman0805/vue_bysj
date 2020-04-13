import Vue from 'vue'
import Router from 'vue-router'
/*import HelloWorld from '@/components/HelloWorld'
import Home from '../views/Home'
import Student from '../views/Student'
import PageOne from '../views/pageOne'
import PageTwo from '../views/pageTwo'
import PageThree from '../views/pageThree'
import PageFour from '../views/pageFour'
import index from '../views/index'*/


import Student from '../pages/student'
import Teacher from '../pages/teacher'
import Admin from '../pages/admin'
import Office from '../pages/office'

import Login from '../pages/login/Login'
import AdminLogin from '../pages/login/AdminLogin'

import HolidayTasks from '../pages/holiday/HolidayTasks'
import Holiday from '../pages/holiday/Holiday'
import RunHoliday from '../pages/holiday/RunHoliday'
import HolidayHistory from '../pages/holiday/HolidayHistory'
import SeacherHoliday from '../pages/holiday/SeacherHoliday'
import SeacherTeacherHoliday from '../pages/holiday/SeacherTeacherHoliday'

import Major from '../pages/major/major'
import MajorTask from '../pages/major/majorTask'
import RunMajor from '../pages/major/RunMajor'
import SetClass from '../pages/major/SetClass'

import Register from  '../pages/login/Register'
import NotFound from '../pages/404'
import store from '../store'
Vue.use(Router)

const router = new Router({
  mode:"history",
  routes: [
    /*审批人员登录*/
    {
      path: '/adminLogin',
      name: 'adminLogin',
      show:false,
      component: AdminLogin
    }
    /*用户登录*/
    ,{
      path: '/login',
      name: 'login',
      show:false,
      component: Login
    }
    ,
    /**
     * 学生页内容
     */
    {
      path: '/student',
      name: '请假申请',
      show:'学生',

      component: Student,
      redirect:"/student/holiday",
      children: [
        {
          path: '/student/holiday',
          name: '填写申请',
          component : Holiday
        }
        , {
          path: '/student/runHoliday',
          name: '申请进度',
          component : RunHoliday
        }
        , {
          path: '/student/holidayHistory',
          name: '申请记录',
          component : HolidayHistory
        }
      ]
    },
    {
      path: '/student',
      name: '转专业申请',
      show:'学生',

      component: Student,
      redirect:"/student/holiday",
      children: [
        {
          path: '/student/major',
          name: '填写申请',
          component : Major
        },
        {
          path: '/student/runMajor',
          name: '申请进度',
          component : RunMajor
        }

      ]
    },
    /**
     * 教师页内容
     */
    {
      path: '/teacher',
      name: '请假申请',
      show:'教师',

      component: Teacher,
      redirect:"/teacher/holiday",
      children: [
        {
          path: '/teacher/holiday',
          name: '填写申请',
          component : Holiday
        }
        , {
          path: '/teacher/runHoliday',
          name: '申请进度',
          component : RunHoliday
        }
        , {
          path: '/teacher/holidayHistory',
          name: '申请记录',
          component : HolidayHistory
        }
      ]
    },
    {
      path: '/taks',
      name: '待办任务',
      show: '教师',
      component: Teacher,
      children: []
    }
    /**
     * 审批人员页面
     */
    //辅导员
    ,{
      path: '/admin',
      name: '查看',
      show: '管理',
      component: Admin,
      children: [
        //学生请假记录
        {
          path: '/seacherStudentHoliday',
          name: '学生请假记录',
          show:'Group_Instructor',//辅导员
          component: SeacherHoliday
        },
        {
          path: '/seacherStudentHoliday',
          name: '学生请假记录',
          show:'Group_Secretory',//书记
          component: SeacherHoliday
        },
        {
          path: '/seacherStudentHoliday',
          name: '学生请假记录',
          show:'Group_Dean',//院长
          component: SeacherHoliday
        },
        {
          path: '/seacherStudentHoliday',
          name: '学生请假记录',
          show:'Group_DepartmentDirector',//系主任
          component: SeacherHoliday
        },
        //教师请假记录
        {
          path: '/seacherTeacherHoliday',
          name: '教师请假记录',
          show: 'Group_DepartmentDirector',//系主任
          component: SeacherTeacherHoliday
        },
        {
          path: '/seacherTeacherHoliday',
          name: '教师请假记录',
          show: 'Group_Dean',//院长
          component: SeacherTeacherHoliday
        },
        //转专业申请记录
        {
          path: '/seacherTeacherHoliday',
          name: '转专业申请记录',
          show: 'Group_Dean',//院长
          component: SeacherTeacherHoliday
        },

      ]
    }
    ,{
      path: '/admin',
      name: '待办任务',
      show: '管理',
      component: Admin,
      children: [
        {
          path: '/holidayTasks',
          name: '请假审批',
          show:'Group_Instructor',//辅导员
          component: HolidayTasks
        },
        {
          path: '/holidayTasks',
          name: '请假审批',
          show: 'Group_DepartmentDirector',//系主任
          component: HolidayTasks
        },
        {
          path: '/holidayTasks',
          name: '请假审批',
          show:'Group_Secretory',//书记
          component: HolidayTasks
        },
        {
          path: '/holidayTasks',
          name: '请假审批',
          show: 'Group_Dean',//院长
          component: HolidayTasks
        },
        {
          path: '/major/seacherTask',
          name: '转专业审批',
          show: 'Group_Dean',//院长
          component: MajorTask
        }
      ]
    },
    /**
     * 办事处界面
     */
    {
      path: '/office',
      name: '查看',
      show: '办事处',
      component: Office,
      redirect: '/major/seacherTask',
      children: [
        //转专业审s批
        {
          path: '/major/seacherTask',
          name: '转专业审批',
          show: 'Group_AcademicAffairs',//学院教务办
          component: MajorTask
        }
        ]

    },
    {
      path: '/office',
      name: '待办任务',
      show: '办事处',
      component: Office,
      redirect:'/major/seacherTask',
      children: [
        //转专业审s批
        {
          path: '/major/seacherTask',
          name: '转专业申请',
          show: 'Group_AcademicAffairs',//学院教务办
          component: MajorTask
        },
        {
          path: '/major/seacherTask',
          name: '转专业申请',
          show: 'Group_AdministrationOffice',//学校教务办
          component: MajorTask
        },
        //设置新班级
        {
          path: '/major/setClass',
          name: '班级分配',
          show: 'Group_AcademicAffairs',//学院教务办
          component: SetClass
        },
        /*{
          path: '/major/seacherTask',
          name: '转专业审批',
          show: 'Group_AdministrationOffice',//学校教务办
          component: MajorTask,
          children: [
            //转专业审s批
            {
              path: '/major/seacherTask',
              name: '转专业审批1',
              show: 'Group_AdministrationOffice',//学校教务办
              component: MajorTask
            },
            //转专业审s批
            {
              path: '/major/seacherTask',
              name: '转专业审批2',
              show: 'Group_AdministrationOffice',//学校教务办
              component: MajorTask
            },

          ]
        }*/
      ]
    },










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
  const isLogin = localStorage.getItem("eleToken") ? true :false ;
  const login = sessionStorage.getItem("eleToken")? true :false ;
  const  log = window.sessionStorage.getItem("eleToken")? true :false ;
  if(to.path ==="/adminLogin" ||to.path ==="/login"|| to.path ==="/register"){
    next();
  }else{
    login ? next() :next("/login") ;  /*真跳转  假注册*/
  }
})
;
export default router;





