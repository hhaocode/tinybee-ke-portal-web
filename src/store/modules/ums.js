import { join, userCourseInfo, computeOrder } from '@/api/ums'
const state = {}

const mutations = {}

const actions = {
  join ({ commit }, courseId) {
    return new Promise((resolve, reject) => {
      join(courseId)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  userCourseInfo ({ commit }, courseId) {
    return new Promise((resolve, reject) => {
      userCourseInfo(courseId)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  computeOrder ({ commit }, courseId) {
    return new Promise((resolve, reject) => {
      computeOrder(courseId)
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
