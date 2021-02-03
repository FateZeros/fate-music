/**
 * 歌曲作者
 */
export interface IArtist {
  id: number
  name: string
  picUrl?: string
  albumSize?: number
}

/**
 * 歌曲专辑
 */
export interface IAlbum {
  id: number
  name: string
  pic: number
  picUrl: string
}

/**
 * mv-item
 */
export interface IMv {
  id: number
  name: string
  playCount: number
  artistName: string
  artistId: number
  artists: IArtist[]
  duration: number
}

/**
 * 用户信息
 */
export interface IUser {
  userId: number
  nickname: string
  avatarUrl: string
  signature: string
  gender: number
  province: number
  city: number
  birthday: number
}
