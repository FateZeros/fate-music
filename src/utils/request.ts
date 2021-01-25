import axios, { ResponseType, AxiosInstance, AxiosRequestConfig } from 'axios'

const TIME_OUT = 1000 * 10
const MIME_TYPE: IDictionary<ResponseType> = {
  JSON: 'json'
}

let baseURL: string = ''
if (process.env.REACT_APP_NODE_ENV === 'development') {
  baseURL = '/CORS'
} else {
  baseURL = process.env.REACT_APP_BASE_URL || ''
}

const service = axios.create({
  baseURL,
  // 允许携带cookie
  withCredentials: true,
  timeout: TIME_OUT,
  responseType: MIME_TYPE.JSON
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: any) => {
    // if (response.data.code === 200) {
    return response.data
    // } else {
    //   return Promise.reject(response.data.message || '接口错误～')
    // }
  },
  (error: any) => {
    const { response } = error
    const errorMsg =
      (response && response.data && response.data.message) || '服务器错误～'
    return Promise.reject(errorMsg)
  }
)

interface Instance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>
}

const request: Instance = service

export default request
