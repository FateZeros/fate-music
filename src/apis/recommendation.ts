import request from 'utils/request'
import { IBannerRequest } from './types/recommendation'

// 获取 banner
const getBannerList = (params: IBannerRequest) => {
  return request({
    url: '/banner',
    method: 'get',
    params
  })
}

export { getBannerList }
