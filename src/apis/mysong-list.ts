import request from 'utils/request'
import {
  IUserPlayListResquest,
  IUserPlayListResponse,
  IPlaylistDetailResponse
} from 'interfaces/mysong-list'

// 获取用户的歌单
const getUserPlayList = async (
  params: IUserPlayListResquest
): Promise<IUserPlayListResponse[]> => {
  const response = await request({
    url: '/user/playlist',
    method: 'get',
    params
  })
  return response.playlist
}

// 获取歌单详情
const getPlaylistDetail = async (params): Promise<IPlaylistDetailResponse> => {
  const response = await request({
    url: '/playlist/detail',
    method: 'get',
    params
  })
  return response.playlist
}

export { getUserPlayList, getPlaylistDetail }
