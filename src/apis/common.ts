import request from 'utils/request'

import { ISongUrlRes, IVideoUrlRes } from 'interfaces/common'

// 获取歌曲 URL
const getSongUrl = async (id): Promise<ISongUrlRes[]> => {
  const res = await request({
    url: '/song/url',
    method: 'get',
    params: {
      id
    }
  })
  return res.data
}

// 获取视频 URL
const getVideoUrl = async (id): Promise<IVideoUrlRes> => {
  const res = await request({
    url: '/mv/url',
    method: 'get',
    params: {
      id
    }
  })
  return res.data
}

export { getSongUrl, getVideoUrl }
