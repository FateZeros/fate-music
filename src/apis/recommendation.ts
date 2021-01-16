import request from 'utils/request'
import {
  IBannerRequest,
  IBannerResponse,
  IRecommendResponse
} from './types/recommendation'

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

// 每日推荐歌单
const getRecommendResource = async (): Promise<IRecommendResponse[]> => {
  const response = await request({
    url: '/recommend/resource',
    method: 'get'
  })
  return response.recommend
}

export { getBannerList, getRecommendResource }
