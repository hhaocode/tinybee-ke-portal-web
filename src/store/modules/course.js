import { page, detail, chapters } from '@/api/course'
const state = {
  courseTypeMap: {
    1: '课程',
    2: '专栏'
  }
}

const mutations = {}

const actions = {
  page ({ commit }, params) {
    return new Promise((resolve, reject) => {
      page(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  detail ({ commit }, id) {
    return new Promise((resolve, reject) => {
      detail(id)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  chapters ({ commit }, params) {
    return new Promise((resolve, reject) => {
      chapters(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
