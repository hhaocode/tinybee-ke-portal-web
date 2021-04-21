import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import app from './modules/app'
// import search from './modules/search'
import { getToken } from '@/utils/auth'

Vue.use(Router)

// const modulesFiles = require.context('./modules', true, /\.js$/)

// console.log(modulesFiles)
// const childrenRoutes = modulesFiles.keys().reduce((routes, modulePath) => {
//   console.log(modulePath)
//   routes.push(...modulesFiles(modulePath).default)
//   return routes
// }, [])

// 拦截错误
// childrenRoutes.push({
//   path: '*',
//   name: 'noFound',
//   meta: { title: '404' },
//   component: () => import('@/views/error/404')
//   // hidden: true
// })

// const routes = [
//   {
//     path: '/',
//     name: 'Layout',
//     component: () => import('@/views/layout'),
//     redirect: '/',
//     children: childrenRoutes
//   }
// ]

// const routes = [
// {
//   path: "/",
//   name: "Home",
//   component: Home
// },
// {
//   path: "/about",
//   name: "About",
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () =>
//     import(/* webpackChunkName: "about" */ "../views/About.vue")
// }
// ]

const routes = [
  ...app,
  {
    name: 'TestVideo',
    path: '/testVideo',
    component: () => import('@/views/test/TestVideo')
  },
  {
    name: 'aliyunVod',
    path: '/aliyunVod',
    component: () => import('@/components/player/AliyunVodPlayer')
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const router = createRouter()

const permissions = ['/u', '/o']
const checkPermission = (route) => {
  for (const permission of permissions) {
    if (route.path.indexOf(permission) !== -1) {
      return true
    }
  }
  return false
}

Router.prototype.isBack = false
Router.prototype.transitionName = ''

// async function
// const asyncGetToken = async function (token) {
//   await store.dispatch('app/setToken', token)
// }

router.beforeEach((to, from, next) => {
  router.transitionName = router.isBack ? 'right' : 'left'
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // console.log(to)

  var token = getToken()
  //  && !store.state.app.token
  console.log(token)
  if (token) {
    if (!store.state.app.token) {
      store.dispatch('app/setToken', token)
      token = getToken()
    }
    // console.log('store.dispatch(app/setToken, token)', res)
    // console.log(res)
    // var token = getToken()
    // if (res.code === 0) {
    //   // 一登录的
    // }
  }
  if (token && store.state.app.user && (to.name === 'Login' || to.name === 'Register')) {
    console.log(token)
    console.log(store.state.app.user)
    router.replace({ path: '/' }).catch(e => {})
    return
  }
  // else {
  //   // 判断是否需要权限控制
  // }
  // console.log(to, from)
  if (!token && checkPermission(to)) {
    console.log(to)
    console.log(window.location.href)
    router.push({ name: 'Login', query: { redirect: window.location.href } }).catch(e => {})
    return
  }
  console.log(to)
  next()
  router.isBack = false
})

router.afterEach(() => {
})

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
