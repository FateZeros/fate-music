enum BannerType {
  PC = 0,
  Andriod = 1,
  Iphone = 2,
  Ipad = 3
}

export interface IBannerRequest {
  type: BannerType
}

export interface IBannerResponse {
  pic: string
  typeTitle: string
  targetId: number
  targetType: number
}

export interface IRecommendResponse {
  id: string
  type: number
  copywriter: string
  playcount: number
  picUrl: string
}

export interface ITopPlayMusicCreator {
  userId: number
  nickname: string
  avatarUrl: string
}

export interface ITopPlayListRespose {
  id: number
  name: string
  playCount: number
  coverImgUrl: string
  description: string
  creator: ITopPlayMusicCreator
}

export interface IOneHighqualityResponse {
  name?: string
  id?: number
  copywriter?: string
  coverImgUrl?: string
}
