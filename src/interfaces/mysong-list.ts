import { IUser } from './common'

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
