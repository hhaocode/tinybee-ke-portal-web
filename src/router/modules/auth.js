const routes = [
  {
    path: '/auth',
    name: 'Auth',
    redirect: 'login',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/Auth'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/Login'),
        meta: { title: '小蜜蜂课堂-登录' }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "auth" */ '@/views/auth/register'),
        meta: { title: '小蜜蜂课堂-注册' }
      }
    ]
  }
]

getFullPath('', routes)

function getFullPath (baseDir, children) {
  children &&
    children.map(item => {
      item.fullPath = baseDir + '/' + item.path
      getFullPath(baseDir + item.path, item.children)
    })
}

export default routes
