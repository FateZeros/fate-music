import request from 'utils/request'
import {
  IUserPlayListResquest,
  IUserPlayListResponse
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

export { getUserPlayList }
