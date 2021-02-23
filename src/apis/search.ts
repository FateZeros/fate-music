import request from 'utils/request'
import {
  ISearchHotDetailResponse,
  ISeacrhResultRequest,
  ISeacrhResultResponseMix
} from 'interfaces/search'

// 热搜列表
const getSearchHotDetail = async (): Promise<ISearchHotDetailResponse[]> => {
  const res = await request({
    url: '/search/hot/detail',
    method: 'get'
  })
  return res.data
}

/*
 * 搜索结果
 * type: 搜索类型；默认为 1 即单曲
 * 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 */
const getSearchResultList = async (
  params: ISeacrhResultRequest
): Promise<ISeacrhResultResponseMix> => {
  const res = await request({
    url: '/search',
    method: 'get',
    params
  })
  return res.result
}

export { getSearchHotDetail, getSearchResultList }
