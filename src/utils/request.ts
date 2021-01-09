import axios from 'axios'

const TIME_OUT = 1000 * 10

let baseURL: string = ''
if (process.env.REACT_APP_BASE_URL === 'development') {
  baseURL = '/CORS'
} else {
  baseURL = process.env.REACT_APP_BASE_URL || ''
}

// create an axios instance
const service = axios.create({
  baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 15 // request timeout
})
