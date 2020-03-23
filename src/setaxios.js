import axios from 'axios'
import store from './store'
import router from './router/index'

//http全局拦截
//token要放在我们请求的header上面带回给后端

export default function setAxios(){
  //请求拦截
  axios.interceptors.request.use(
    config=>{
      if(store.state.token){
        config.headers.token=store.state.token
      }
      return config
    }
  )
  //每次请求有返回的，都是先警告拦截器最先的
  axios.interceptors.response.use(
    response=>{
      if(response.status==200){
        const data=response.data
        if(data.code==-1){
          //登录过期 需求重新登录 情况vuex的token和localstorge的token
          store.commit('settoken','')
          localStorage.removeItem('token')
          //调转到login界面
          router.replace({path:'/login'})
        }
        return data
      }
      return response
    }
  )
}
