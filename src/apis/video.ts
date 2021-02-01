import request from 'utils/request'

import { IMvFirstRequest, IMvFirstResponse } from 'interfaces/video'

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

export { getMvFirst, getExclusiveRcmd }
