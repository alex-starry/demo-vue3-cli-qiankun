import * as services from './services'
import store from '../../store'
import axios, { AxiosRequestHeaders, AxiosResponse, AxiosRequestConfig } from 'axios'

const instance = axios.create({
  timeout: 10000,
  withCredentials: true
})

instance.interceptors.request.use(config => {
  const { token: { tokenType, accessToken }, currentTenantId } = store.state.user
  const headers: AxiosRequestHeaders = { Authorization: '' }
  if (tokenType && accessToken) {
    headers.Authorization = `${tokenType} ${accessToken}`
  }
  if (tokenType && accessToken) {
    headers.currentTenantId = currentTenantId
  }
  config.headers = Object.assign(config.headers, headers)
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(({ data = { ret: 0, msg: '' }, status }) => {
  const { ret, msg = '接口请求错误' } = data
  if (status !== 200) {
    store.dispatch('showToast', { type: 'fail', message: '接口请求错误' })
    return Promise.reject(new Error(msg))
  }
  if (ret !== 0) {
    store.dispatch('showToast', { type: 'fail', message: msg })
    return Promise.reject(msg)
  }
  return Promise.resolve(data.result)
}, error => {
  store.dispatch('showToast', { type: 'fail', message: '接口请求异常，请稍后重试' })
  return Promise.reject(error)
})

interface HttpRequestConfig<> extends AxiosRequestConfig {
  serviceName?: string;
  apiName?: string;
  query?: {
    [key: string]: string
  };
}

const http = (config: HttpRequestConfig): Promise<AxiosResponse> => {
  const { serviceName = 'gateway', apiName, query = {} } = config
  const service = services[serviceName]
  const api = service[apiName]
  config.url = service.domain
  if (Object.keys(query).length > 0) {
    Object.keys(query).forEach(key => {
      config.url += api.url.replace(new RegExp(`{${key}}`, 'g'), query[key])
    })
  } else {
    config.url += api.url
  }
  config.method = api.method
  delete config.serviceName
  delete config.apiName
  delete config.query
  const axiosRequestConfig: AxiosRequestConfig = { ...config }
  return instance.request(axiosRequestConfig)
}

export default http
