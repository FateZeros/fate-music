import request from 'utils/request'

import {
  IBannerRequest,
  IBannerResponse,
  IRecommendResponse,
  ITopPlayListRespose,
  IOneHighqualityResponse,
  IPrivateContentRepose,
  IPersonalizedNewsongsResponse,
  IRecommendSongsResponse,
  IPersonalizedMVsResponse
} from 'interfaces/recommendation'

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

// 每日推荐歌单 - 需要登录
const getRecommendResource = async (): Promise<IRecommendResponse[]> => {
  const response = await request({
    url: '/recommend/resource',
    method: 'get'
  })
  return response.recommend
}

// 每日推荐歌曲
const getRecommendSongs = async (): Promise<IRecommendSongsResponse[]> => {
  const response = await request({
    url: '/recommend/songs',
    method: 'get'
  })
  return response.data && response.data.dailySongs
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
const getPersonalizedNewsongs = async (): Promise<
  IPersonalizedNewsongsResponse[]
> => {
  const response = await request({
    url: '/personalized/newsong',
    method: 'get'
  })
  return response.result
}

// 推荐 MV
const getPersonalizedMVs = async (): Promise<IPersonalizedMVsResponse[]> => {
  const response = await request({
    url: '/personalized/mv',
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
  getPersonalizedNewsongs,
  getRecommendSongs,
  getPersonalizedMVs
}
