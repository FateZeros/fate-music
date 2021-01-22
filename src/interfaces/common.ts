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
