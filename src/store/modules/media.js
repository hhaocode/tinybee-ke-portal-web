import { getVodPlayAuth } from '@/api/media'
const state = {}

const mutations = {}

const actions = {
  getVodPlayAuth ({ commit }, vid) {
    return new Promise((resolve, reject) => {
      getVodPlayAuth(vid)
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
