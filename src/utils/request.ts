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

const createInstance = () => {
  console.log(baseURL, process.env.REACT_APP_BASE_URL, 1212)
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: TIME_OUT,
    responseType: MIME_TYPE.JSON
  })

  instance.interceptors.response.use(handleResponse, handleError)

  return instance
}

const handleResponse = (response: any) => {
  return response.data
}

const handleError = (error: any) => {
  const { response, message } = error
  return Promise.reject(
    response && response.data
      ? new Error(response.data.message || message)
      : error
  )
}

interface Instance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>
}

const request: Instance = createInstance()

export default request
