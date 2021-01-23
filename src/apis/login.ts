import request from 'utils/request'

import {
  ILoginCellphoneRequest,
  ILoginCellphoneResponse,
  ILoginQrkeyRes
} from 'interfaces/login'

// 二维码key生成接口
const loginQrKey = async (): Promise<ILoginQrkeyRes> => {
  const res = await request({
    url: '/login/qr/key',
    method: 'get'
  })
  return res.data
}

// 手机号码登录
const loginCellphone = (
  params: ILoginCellphoneRequest
): Promise<ILoginCellphoneResponse> => {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data: params
  })
}

// 退出登录
const loginOut = () => {
  return request({
    url: '/loginout',
    method: 'post'
  })
}

export { loginQrKey, loginCellphone, loginOut }
