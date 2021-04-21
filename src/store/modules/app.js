
import { register, login, getCacheUser, logout } from '@/api/app'
import { setToken, removeToken } from '@/utils/auth'
const state = {
  token: '',
  user: '',
  authing: false,
  orderTypeMap: {
    1: '课程',
    2: '商城'
  },
  orderStatusMap: {
    1: '待支付', 2: '已支付', 3: '无效'
  }

}

const mutations = {
  setCacheUser: (state, user) => {
    state.user = user
  },
  setToken: (state, token) => {
    state.token = token
    setToken(token)
  },
  setAuthing: (state, authing) => {
    state.authing = authing
  },
  clearLoginInfo: (state) => {
    state.user = ''
    state.token = ''
    removeToken()
  }
}

const actions = {
  authing ({ commit }, authing) {
    commit('setAuthing', authing)
  },
  register ({ commit }, param) {
    return new Promise((resolve, reject) => {
      register(param).then(res => {
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  login ({ commit, dispatch }, param) {
    return new Promise((resolve, reject) => {
      login(param).then(res => {
        if (res.code === 0) {
          dispatch('setToken', res.data)
        }
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },

  async setToken ({ commit, dispatch }, token) {
    await commit('setToken', token)
    await getCacheUser().then(res => {
      if (res.code === 0) {
        commit('setCacheUser', res.data)
        // commit('setToken', token)
      } else {
        removeToken()
        // commit('clearLoginInfo')
      }
      // resolve(res)//
      return res
    })

    // return new Promise((resolve, reject) => {
    //   commit('setToken', token)
    //   getCacheUser().then(res => {
    //     if (res.code === 0) {
    //       commit('setCacheUser', res.data)
    //     }
    //     resolve(res)
    //   })
    // })
  },
  logout ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        commit('setCacheUser', '')
        commit('setToken', '')
        resolve(res)
      })
    })
  },
  async clearLoginInfo ({ commit }) {
    await commit('clearLoginInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
