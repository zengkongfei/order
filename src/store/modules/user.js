import { login, logout, getInfo } from '@/api/basic'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: localStorage.getItem("avatar"),
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log(userInfo)
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const token = res.datas.token
          this.avatar="http://bucket-health-test.oss-cn-hangzhou.aliyuncs.com/fbe6ef99718743908d654baedb982614.jpeg?Expires=1581499025&OSSAccessKeyId=LTAIo4pB85rIrn3v&Signature=b5EYVB5mS0iRFCKzD%2FqASXo5TdE%3D"
          setToken(token)
          commit('SET_TOKEN', token)
          commit('SET_AVATAR', this.avatar)
          localStorage.setItem("avatar",this.avatar)
          resolve()
        }).catch(error => {
             reject(error)
           })
      })},




    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()

      })
    }
  }
}

export default user
