export function simpleTreeToHandler (tree, key) {
  const convertListToMap = (resMap, tree) => {
    tree.forEach(row => {
      resMap[row[key]] = row
      if (row.children && row.children.length) {
        convertListToMap(resMap, row.children)
      }
    })
  }
  const resMap = {}
  convertListToMap(resMap, tree)
  return resMap
}

/**
 * list转为马匹
 * @param {*} lis
 * @param {*} key 最终的map的key字段
 */
export function listToMapHandler (lis, key) {
  const convertListToMap = (idMap, resMap, lis) => {
    lis.forEach(row => {
      resMap[row[key]] = row
      idMap[row.id] = row
      if (row.children && row.children.length) {
        convertListToMap(idMap, resMap, row.children)
      }
    })
  }
  const resMap = {}
  const idMap = {}
  convertListToMap(idMap, resMap, lis)
  for (const name in resMap) {
    resMap[name].parent = idMap[resMap[name].pid]
  }
  return resMap
}

// 将树形中的节点 从本身到最顶元素遍历成数组
export function treeNodeToArrForChildToParent (treeNode) {
  const res = []
  const appendTreeNodeToArr = treeNode => {
    if (treeNode) {
      res.push(treeNode)
      appendTreeNodeToArr(treeNode.parent)
    }
  }
  appendTreeNodeToArr(treeNode)
  return res
}

// 将树形中的节点 从本身到最顶元素遍历成数组反转
export function treeNodeToArrForChildToParentReverse (treeNode) {
  return reverseForArr(treeNodeToArrForChildToParent(treeNode))
}

export function reverseForArr (arr) {
  if (!arr) {
    return []
  }
  return arr.reverse()
}

export function treeLeafToRootArr (leafNode) {
  var iterateNode = function (resArr, leafNode) {
    if (leafNode) {
      resArr.push(leafNode)
      iterateNode(resArr, leafNode.parent)
    }
  }
  var resArr = []
  iterateNode(resArr, leafNode)
  return resArr
}

export function computeCateNav (cates, cateId) {
  const res = [{ id: '', name: '全部' }]
  const cateMap = listToMapHandler(cates, 'id')
  if (cateId && cateMap[cateId]) {
    for (const item of treeNodeToArrForChildToParentReverse(cateMap[cateId])) {
      res.push(item)
    }
  }
  return res
}

export function listToTreeMap (cates) {
  const idMap = {}
  const pidListMap = {}
  cates.forEach(v => {
    idMap[v.id] = v
    if (pidListMap[v.pid]) {
      pidListMap[v.pid].push(v)
    } else {
      pidListMap[v.pid] = [v]
    }
  })
  cates.forEach(v => {
    v.parent = idMap[v.pid]
    v.children = pidListMap[v.id] || []
    // if (!v.pid) {
    //   resTree.push(v)
    // }
  })
  return idMap
}

export function computeCateNavTopAndSub (cates, cateId) {
  //
  const res = { top: [], sub: [], breadcrumb: false } // Breadcrumb Nav
  const cateMap = listToTreeMap(cates)

  if (cateId && cateMap[cateId]) {
    // 存在  则说明选择了
    // 父级是面包屑
    // 子集是导航
    res.top.push({ id: '', name: '全部' })
    const iterateTmp = v => {
      const iterateTmpRes = []
      var tmp = v
      while (tmp) {
        iterateTmpRes.push(tmp)
        tmp = tmp.parent
      }
      return iterateTmpRes.reverse()
    }
    for (const item of iterateTmp(cateMap[cateId])) {
      res.top.push(item)
    }
    const sub =
      cateMap[cateId].children && cateMap[cateId].children.length
        ? cateMap[cateId].children
        : (cateMap[cateId].parent ? cateMap[cateId].parent.children : [cateMap[cateId]])
    res.sub.push({
      id: cateMap[cateId].children && cateMap[cateId].children.length
        ? cateMap[cateId].id : (cateMap[cateId].parent ? cateMap[cateId].parent.id : ''),
      name: '全部'
    })
    res.sub = res.sub.concat(sub)
    res.breadcrumb = true
  } else {
    // 没有选择  则上级是顶级当行
    // 下级是全部二级导航
    res.top.push({ id: 'all', name: '全部分类: ' })
    cates.forEach(v => {
      if (!v.pid) {
        res.top.push(v)
      }
    })
    res.sub.push({ id: '', name: '全部' })
    for (const cate of cates) {
      if (cate.children) {
        res.sub = res.sub.concat(cate.children)
      }
    }
  }
  return res
}
