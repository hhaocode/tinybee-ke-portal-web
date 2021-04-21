const routes = [
  {
    path: '/course/list',
    name: 'CourseList',
    component: () => import(/* webpackChunkName: "content" */ '@/views/course/List'),
    meta: { title: '全部课程-小蜜蜂课堂' }
  },
  {
    path: '/course/intro/:id',
    name: 'Intro',
    component: () => import(/* webpackChunkName: "content" */ '@/views/course/Intro'),
    meta: { title: '小蜜蜂课堂 - 内容详情' }
  },
  {
    path: '/player',
    name: 'ArcusPlayer',
    component: () => import(/* webpackChunkName: "content" */ '@/views/course/player')
  },
  // {
  //   path: '/intro',
  //   name: 'Intro',
  //   component: () => import('@/views/content/intro')
  // },
  {
    path: '/video/:id',
    name: 'ArcusVideo',
    component: () => import(/* webpackChunkName: "content" */ '@/views/course/video')
  },
  {
    path: '/column',
    name: 'Column',
    component: () => import(/* webpackChunkName: "content" */ '@/views/course/Column')
  },
  {
    path: '/pubicLesson',
    name: 'PubicLesson',
    component: () => import(/* webpackChunkName: "content" */ '@/views/course/PubicLesson'),
    meta: { title: '公开课-小蜜蜂课堂' }
  },
  {
    path: '/dailyLesson',
    name: 'DailyLesson',
    component: () => import(/* webpackChunkName: "content" */ '@/views/course/DailyLesson'),
    meta: { title: '每日一课-小蜜蜂课堂' }
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
