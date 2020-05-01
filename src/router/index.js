import Vue from 'vue'
import Router from 'vue-router'

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
import Result from '../pages/major/Result'
import SearchMajor from '../pages/major/SeacherMajor'

import Project from '../pages/project/Project'
import ProjectTask from '../pages/project/projectTask'
import SearchProject from '../pages/project/SearchProject'

import Register from  '../pages/login/Register'
import Password from '../pages/user/password'
import Password_2 from '../pages/user/password_2'

import NotFound from '../pages/404'
import store from '../store'
Vue.use(Router)

const router = new Router({
  mode:"history",
  routes: [
    /*注册页面*/
    {
      path:'/register',
      name:'register',
      show:false,
      component:Register
    },
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
    /*修改密码*/
    ,{
      path: '/password',
      name: '个人中心',
      show:false,
      component: Password
    },
    {
      path: '/password_2',
      name: '个人中心',
      show:false,
      component: Password_2
    },
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
    {
      path: '/student',
      name: '项目立项申请',
      show:'学生',
      component: Student,
      redirect:"/student/project",
      children:[
        {
          path: '/student/project',
          name: '立项申请',
          component : Project
        }
      ]
    },
    {
      path: '/password',
      name: '个人中心',
      show:'学生',
      component: Student,
      children:[
        {
          path: '/password',
          name: '修改密码',
          component : Password
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
      path: '/teacher',
      name: '立项申请',
      show:'教师',
      component: Teacher,
      redirect:"/teacher/project",
      children:[
        {
          path: '/teacher/project',
          name: '立项申请',
          component : Project
        }
      ]
    },
    {
      path: '/tasks',
      name: '待办任务',
      show: '教师',
      component: Teacher,
      children: []
    },
    {
      path: '/password',
      name: '个人中心',
      show:'教师',
      component: Teacher,
      children:[
        {
          path: '/password',
          name: '修改密码',
          component : Password
        }
      ]
    },
    /**
     * 审批人员页面
     */
    {
      path: '/admin',
      name: '查看',
      show: '管理',
      component: Admin,
      redirect:'/seacherStudentHoliday',
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
          path: '/SearchMajor',
          name: '转专业申请记录',
          show: 'Group_Dean',//院长
          component: Result

        },
        //项目立项申请记录
        {
          path:'/searchProject',
          name:'项目立项申请记录',
          show:'Group_Instructor',//辅导员
          component:SearchProject
        },
        {
          path:'/searchProject',
          name:'项目立项申请记录',
          show:'Group_DepartmentDirector',//系主任
          component:SearchProject
        },
        {
          path:'/searchProject',
          name:'项目立项申请记录',
          show:'Group_ViceDean',//副院长
          component:SearchProject
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
        },

        {
          path: '/project/projectTask',
          name: '项目申请审批',
          show: 'Group_Instructor',//辅导员
          component: ProjectTask
        },
        {
          path: '/project/projectTask',
          name: '项目申请审批',
          show: 'Group_DepartmentDirector',//系主任
          component: ProjectTask
        },
        {
          path: '/project/projectTask',
          name: '项目申请审批',
          show: 'Group_ViceDean',//副院长
          component: ProjectTask
        },

      ]
    },

    {
      path: '/password',
      name: '个人中心',
      show:'管理',
      component: Admin,
      children:[
        {
          path: '/password',
          name: '修改密码',
          show:'Group_ViceDean',//副院长
          component : Password
        },
        {
          path: '/password',
          name: '修改密码',
          show:'Group_Instructor',//辅导员
          component : Password
        },
        {
          path: '/password',
          name: '修改密码',
          show:'Group_DepartmentDirector',//系主任
          component : Password
        },
        {
          path: '/password',
          name: '修改密码',
          show:'Group_Secretory',//书记
          component : Password
        },
        {
          path: '/password',
          name: '修改密码',
          show:'Group_Dean',//院长
          component : Password
        },
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
      redirect: '/major/result',
      children: [

        {
          path: '/major/result',
          name: '转专业结果',
          show: 'Group_AcademicAffairs',//学院教务办
          component: Result
        },
        {
          path: '/major/result',
          name: '转专业结果',
          show: 'Group_AdministrationOffice',//学院教务办
          component: Result
        },
        {
          path:'/searchProject',
          name:'项目立项申请记录',
          show:'Group_SciAndTech',//科技处
          component:SearchProject
        },
        {
          path:'/searchProject',
          name:'项目立项申请记录',
          show:'Group_Finance',//财务处
          component:SearchProject
        },
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
        //项目申请审批
        {
          path: '/project/projectTask',
          name: '项目申请审批',
          show: 'Group_SciAndTech',//科技处
          component: ProjectTask
        },
        {
          path: '/project/projectTask',
          name: '项目申请审批',
          show: 'Group_Finance',//财务处
          component: ProjectTask
        }
      ]
    },
    {
      path: '/password',
      name: '个人中心',
      show:'办事处',
      component: Office,
      children:[
        {
          path: '/password',
          name: '修改密码',
          show:'Group_AcademicAffairs',//学院教务处
          component : Password
        },
        {
          path: '/password',
          name: '修改密码',
          show:'Group_AdministrationOffice',//学校教务处
          component : Password
        },
        {
          path: '/password',
          name: '修改密码',
          show:'Group_SciAndTech',//科技处
          component : Password
        },
        {
          path: '/password',
          name: '修改密码',
          show:'Group_Finance',//财务处
          component : Password
        },
      ]
    },

    ]
})

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





