import course from './course'
import auth from './auth'
import gogogo from './gogogo'
import ums from './ums'
import search from './search'
import demo from './demo'
const routes = [
  {
    path: '/',
    // name: 'Layout',
    component: () => import(/* webpackChunkName: "base" */ '@/views/layout'),
    // redirect: '/',
    default: 'Index',
    meta: { title: '小蜜蜂课堂' },
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import(/* webpackChunkName: "base" */ '@/views/home/index'),
        meta: { title: '小蜜蜂课堂' }
      },
      ...course,
      ...ums,
      ...search
    ]
  },
  ...auth,
  ...gogogo,
  ...demo
]

getFullPath('', routes)

function getFullPath (baseDir, children) {
  children && children.map(item => {
    item.fullPath = baseDir + '/' + item.path
    getFullPath(baseDir + item.path, item.children)
  })
}

export default routes
