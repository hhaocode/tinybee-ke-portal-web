const routes = [
  {
    path: '/u',
    name: 'U',
    component: () => import(/* webpackChunkName: "u" */ '@/views/ums'),
    meta: { title: '个人中心' },
    redirect: '/u/personal-info',
    children: [
      {
        path: 'personal-info',
        name: 'PersonalInfo',
        component: () =>
          import(/* webpackChunkName: "u" */ '@/views/ums/PersonalInfo'),
        meta: { title: '个人中心' }
      },
      {
        path: 'study-info',
        name: 'StudyInfo',
        component: () =>
          import(/* webpackChunkName: "u" */ '@/views/ums/StudyInfo'),
        meta: { title: '我的学习' }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () =>
          import(/* webpackChunkName: "u" */ '@/views/ums/Orders'),
        meta: { title: '我的订单' }
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () =>
          import(/* webpackChunkName: "u" */ '@/views/ums/Coupon'),
        meta: { title: '优惠卷' }
      },
      {
        path: 'assignment',
        name: 'assignment',
        component: () =>
          import(/* webpackChunkName: "u" */ '@/views/ums/Assignment'),
        meta: { title: '我的作业' }
      },
      {
        path: 'evaluating',
        name: 'evaluating',
        component: () =>
          import(/* webpackChunkName: "u" */ '@/views/ums/Evaluating'),
        meta: { title: '我的评测' }
      },
      {
        path: 'contract',
        name: 'contract',
        component: () =>
          import(/* webpackChunkName: "u" */ '@/views/ums/Contract'),
        meta: { title: '我的合同' }
      },
      {
        path: 'faq',
        name: 'faq',
        component: () => import(/* webpackChunkName: "u" */ '@/views/ums/FAQ'),
        meta: { title: '常见问题' }
      },
      {
        path: 'balance',
        name: 'balance',
        component: () => import(/* webpackChunkName: "u" */ '@/views/ums/Balance'),
        meta: { title: '我的余额' }
      },
      {
        path: 'fav',
        name: 'Fav',
        component: () => import(/* webpackChunkName: "u" */ '@/views/ums/Fav'),
        meta: { title: '收藏' }
      }
    ]
  },
  {
    path: '/o/confirm-order',
    name: 'ConfirmOrder',
    component: () =>
      import(/* webpackChunkName: "order" */ '@/views/order/ConfirmOrder')
  },
  {
    path: '/o/pay-order',
    name: 'PayOrder',
    component: () =>
      import(/* webpackChunkName: "order" */ '@/views/order/PayOrder')
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
