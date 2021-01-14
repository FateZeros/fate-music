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
    return response
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

interface Instance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>
}

const request: Instance = service

export default request
