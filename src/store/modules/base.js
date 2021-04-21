import { categoryTree, categorys, classifyTree } from '@/api/base'
const state = {
  categoryTree: [],
  categorys: [],
  classifyTree: [],
  classifyMap: {}
}

const mutations = {
  setCategoCryTree: (state, categoryTree) => {
    state.categoryTree = categoryTree
  },
  setCategorys: (state, categorys) => {
    state.categorys = categorys
  },
  setClassifyTree: (state, classifyTree) => {
    state.classifyTree = classifyTree
    const classifyMap = {}
    classifyTree.forEach(element => {
      classifyMap[element.value] = element
      if (element.children) {
        element.children.forEach(v => {
          v.parent = element
          classifyMap[v.value] = v
        })
      }
    })
    state.classifyMap = classifyMap
  }
}

const actions = {
  getCategoryTree ({ commit }) {
    return new Promise((resolve, reject) => {
      categoryTree().then(res => {
        if (res.code === 0) {
          commit('setCategoCryTree', res.data)
        }
        resolve(res)
      }).catch(() => {})
    })
  },
  categorys ({ commit }) {
    return new Promise((resolve, reject) => {
      categorys().then(res => {
        if (res.code === 0) {
          commit('setCategorys', res.data)
        }
        resolve(res)
      }).catch(() => {})
    })
  },
  async classifyTree ({ commit }) {
    await classifyTree().then(res => {
      commit('setClassifyTree', res.data || [])
      res = res.data || []
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
