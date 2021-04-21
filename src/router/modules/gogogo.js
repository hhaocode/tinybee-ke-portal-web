const routes = [
  {
    path: '/gogogo',
    name: 'gogogo',
    component: () => import('@/views/gogogo')
  },
  {
    path: '/study-gogogo',
    name: 'StudyVideo',
    component: () => import('@/views/gogogo/VideoStudy')
  },
  {
    path: '/course-study/:id',
    name: 'CourseStudy',
    component: () => import('@/views/gogogo/CourseStudy')
  },
  {
    path: '/column-study/:id',
    name: 'ColumnStudy',
    component: () => import('@/views/gogogo/ColumnStudy')
  },
  // {
  //   path: '/gogogo',
  //   name: 'gogogo',
  //   component: () => import('@/views/gogogo')
  // },
  {
    path: '/video1',
    name: 'video1',
    component: () => import('@/views/test/Video1')
  },
  {
    path: '/video2',
    name: 'video2',
    component: () => import('@/views/test/Video2')
  },
  {
    path: '/live-room/:id',
    name: 'LiveRoom',
    component: () => import('@/views/gogogo/LiveRoom')
  },
  {
    path: '/course/go/:id',
    name: 'Go',
    component: () => import(/* webpackChunkName: "content" */ '@/views/course/Go'),
    meta: { title: '小蜜蜂课堂 - 学习' }
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
