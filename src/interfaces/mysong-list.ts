import { IUser, ISongItem } from './common'

export interface IUserPlayListResquest {
  uid: number
}

export interface IUserPlayListResponse {
  creator: IUser
  specialType: number
  name: string
  id: number
  coverImgUrl: string
  createTime: number
  playCount: number
  description: unknown
}

/**
 * 歌单详情
 *
 */
export interface IPlaylistDetailResponse {
  id: number
  name: string
  shareCount: number
  commentCount: number
  playCount: number
  trackCount: number
  creator: IUser
  coverImgUrl: string
  createTime: number
  tracks: ISongItem[]
  tags: string[]
}
