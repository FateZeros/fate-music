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

export interface ILoginQrkeyRes {
  code: number
  unikey: string
}

export interface ILoginQrRes {
  qrimg?: string
  qrurl?: string
}
