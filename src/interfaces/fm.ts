import { IArtist, IAlbum } from './common'

export interface IPersonalFMRes {
  name: string
  id: number
  copyrightId: number
  disc: string
  no: number
  artists: IArtist[]
  album: IAlbum
  starred: boolean
  popularity: number
  score: number
  duration: number
}
