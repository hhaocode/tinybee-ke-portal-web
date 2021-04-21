const routes = [
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search')
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
