import { IMv, IArtist } from './common'

export interface IMvFirstRequest {
  area?: number
  limit?: number
}

export interface IMvFirstResponse extends IMv {
  cover: string
}

export interface IMvDetailResponse {
  id: number
  name: string
  artistId: string
  artistName: string
  desc: string
  cover: string
  playCount: number
  subCount: number
  shareCount: number
  commentCount: number
  duration: number
  publishTime: string
  artists: IArtist[]
}

export interface IMvUrlResponse {
  id: number
  url: string
  r: number
  size: number
}

export interface IMvDetailInfoResponse {
  likedCount: number
  shareCount: number
  commentCount: number
  liked: boolean
}

export interface ISimiMvResponse {
  id: number
  cover: string
  name: string
  playCount: number
  briefDesc: string
  artistName: string
  artists: IArtist[]
}
