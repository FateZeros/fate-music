/**
 * 歌曲作者
 */
export interface IArtist {
  id: number
  name: string
  picUrl?: string
  albumSize?: number
  img1v1Url?: string
}

/**
 * 歌曲专辑
 */
export interface IAlbum {
  id: number
  name: string
  pic: number
  picUrl: string
  artist: IArtist
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

/*
 * song-item
 * ar-artise 歌曲作者
 * al-album 歌曲专辑
 * dt 歌曲时长
 */
export interface ISongItem {
  id: number
  name: string
  ar: IArtist[]
  al: IAlbum
  dt: number
  publishTime: number
  artists?: IArtist[]
  alias?: []
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

/**
 * 歌曲 URL
 */
export interface ISongUrlRes {
  id: number
  url: string
  br: number
  size: number
  type: string
  payed: number
}

/**
 * 视频 URL
 */
export interface IVideoUrlRes {
  id: number
  url: string
  r: number
  size: number
}

/**
 * 歌单 item
 */
export interface IPlayListItem {
  id: number
  name: string
  coverImgUrl: string
  subscribed: boolean
  trackCount: number
  userId: number
  playCount: number
  bookCount: number
  specialType: number
  description: string
  highQuality: boolean
}

/**
 * 歌词
 */
export interface ISongLyricRes {
  version: number
  lyric: string
}
