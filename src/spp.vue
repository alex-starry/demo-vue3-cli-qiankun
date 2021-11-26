<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useStore } from 'vuex'

const store = useStore()

if (!window.__POWERED_BY_QIANKUN__) {
  const userStr = sessionStorage.getItem('user') || '{}'
  const { token: { token_type: tokenType, access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken }, currentTenantId } = JSON.parse(userStr)
  store.commit('SET_USER', {
    token: {
      tokenType,
      accessToken,
      expiresIn,
      refreshToken
    },
    currentTenantId
  })
}
</script>

<!-- <style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style> -->
