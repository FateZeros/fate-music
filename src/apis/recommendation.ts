import request from 'utils/request'
import {
  IBannerRequest,
  IBannerResponse,
  IRecommendResponse,
  ITopPlayListRespose,
  IOneHighqualityResponse,
  IPrivateContentRepose,
  IPersonalizedNewsongs
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

// 歌单
const getTopPlayList = async (): Promise<ITopPlayListRespose[]> => {
  const response = await request({
    url: '/top/playlist',
    method: 'get',
    params: {
      limit: 100,
      order: 'new'
    }
  })
  return response.playlists
}

// 获取精品歌单
const getOneHighquality = async (): Promise<IOneHighqualityResponse> => {
  const response = await request({
    url: '/top/playlist/highquality',
    method: 'get',
    params: {
      limit: 1
    }
  })
  return response.playlists[0]
}

// 独家放送 - 入口
const getPrivatecontentEnter = async (): Promise<IPrivateContentRepose[]> => {
  const response = await request({
    url: '/personalized/privatecontent',
    method: 'get'
  })
  return response.result
}

// 推荐新音乐
const getPersonalizedNewsongs = async (): Promise<IPersonalizedNewsongs[]> => {
  const response = await request({
    url: '/personalized/newsong',
    method: 'get'
  })
  return response.result
}

export {
  getBannerList,
  getRecommendResource,
  getTopPlayList,
  getOneHighquality,
  getPrivatecontentEnter,
  getPersonalizedNewsongs
}
