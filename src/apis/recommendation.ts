import request from 'utils/request'
import { IBannerRequest, IBannerResponse } from './types/recommendation'

// 获取 banner
const getBannerList = async (
  params: IBannerRequest
): Promise<IBannerResponse[]> => {
  const response = await request({
    url: '/banner',
    method: 'get',
    params
  })
  return response.banners
}

export { getBannerList }
