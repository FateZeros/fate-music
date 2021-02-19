import request from 'utils/request'
import { ISearchHotDetailResponse } from 'interfaces/search'

// 热搜列表
const getSearchHotDetail = async (): Promise<ISearchHotDetailResponse[]> => {
  const res = await request({
    url: '/search/hot/detail',
    method: 'get'
  })
  return res.data
}

export { getSearchHotDetail }
