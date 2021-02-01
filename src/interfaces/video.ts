import { IMv } from './common'

export interface IMvFirstRequest {
  area?: number
  limit?: number
}

export interface IMvFirstResponse extends IMv {
  cover: string
}
