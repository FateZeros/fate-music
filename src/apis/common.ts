import request from 'utils/request'

import { ISongUrlRes, IVideoUrlRes, ISongLyricRes } from 'interfaces/common'

// 获取歌曲 URL
const getSongUrl = async (params): Promise<ISongUrlRes> => {
  const res = await request({
    url: '/song/url',
    method: 'get',
    params
  })
  return res.data[0]
}

// 获取视频 URL
const getVideoUrl = async (params): Promise<IVideoUrlRes> => {
  const res = await request({
    url: '/mv/url',
    method: 'get',
    params
  })
  return res.data
}

// 获取歌词
const getSongLyric = async (params): Promise<ISongLyricRes> => {
  const res = await request({
    url: '/lyric',
    method: 'get',
    params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res
}

export { getSongUrl, getVideoUrl, getSongLyric }
