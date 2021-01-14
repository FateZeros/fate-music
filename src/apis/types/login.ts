export interface ILoginCellphoneRequest {
  phone: string
  password: string
  countrycode?: string
  md5_password?: string
}

export interface ILoginCellphoneResponse {
  token: string
  account: {
    id: number
    userName: string
  }
  profile: {
    nickname: string
    avatarUrl: string
    signature: string
  }
}
