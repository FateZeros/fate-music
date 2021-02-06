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

/**
 * 主题颜色
 * 浅色、红色、深色、自动
 */
export enum ThemeColor {
  THEME_WHITE = '#888889',
  THEME_RED = '#cc3a3b',
  THEME_BLACK = '#202020',
  THEME_AUTO = '#707070'
}
