import request from 'utils/request'

import {
  IMvFirstRequest,
  IMvFirstResponse,
  IMvDetailResponse,
  IMvUrlResponse
} from 'interfaces/video'

// 获取最新 MV
const getMvFirst = async (
  params: IMvFirstRequest
): Promise<IMvFirstResponse[]> => {
  const response = await request({
    url: '/mv/first',
    method: 'get',
    params
  })
  return response.data
}

// 网易出品
const getExclusiveRcmd = async (params): Promise<IMvFirstResponse[]> => {
  const response = await request({
    url: 'mv/exclusive/rcmd',
    method: 'get',
    params
  })
  return response.data
}

// 获取 MV 详情
const getMvDetail = async (params): Promise<IMvDetailResponse> => {
  const response = await request({
    url: '/mv/detail',
    method: 'get',
    params
  })
  return response.data
}

// 获取 MV URL
const getMvUrl = async (params): Promise<IMvUrlResponse> => {
  const response = await request({
    url: '/mv/url',
    method: 'get',
    params
  })
  return response.data
}

export { getMvFirst, getExclusiveRcmd, getMvDetail, getMvUrl }
