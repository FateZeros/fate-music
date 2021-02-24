import { IArtist, IAlbum, ISongItem } from './common'

export interface ISearchHotDetailResponse {
  searchWord: string
  score: number
  content: string
  source: number
  iconType: number
  iconUrl: string
}

export interface ISeacrhResultRequest {
  keywords: string
  limit?: number
  type?: number
}

// 搜索混合返回结果
export interface ISeacrhResultResponseMix {
  songCount: number
  hasMore: boolean
  songs: ISeacrhResultResponse[]
}

export interface ISeacrhResultResponse {
  id: number
  name: string
  artists: IArtist[]
  album: IAlbum
  duration: number
  copyrightId: number
}

export interface ISearchSuggestResponse {
  albums: IAlbum[]
  songs: ISongItem[]
  artists: IArtist[]
}
