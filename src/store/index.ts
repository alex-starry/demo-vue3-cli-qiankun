import { createStore, MutationTree } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import demo from './demo'

export interface State {
  user: {
    token: {
      accessToken: string,
      expiresIn: number,
      refreshToken: string,
      tokenType: string
    },
    currentTenantId: string
  }
}

const modules = {
  demo
}

const state: State = {
  user: { // 用户
    token: {
      accessToken: '',
      expiresIn: 0,
      refreshToken: '',
      tokenType: ''
    },
    currentTenantId: '0'
  }
}

const getters = {}

const mutations: MutationTree<State> = {
  SET_USER (state, user) {
    state.user = user
  }
}

const actions = {}

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules,
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  strict: debug
})
