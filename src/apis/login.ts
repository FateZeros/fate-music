import request from 'utils/request'

import {
  ILoginCellphoneRequest,
  ILoginCellphoneResponse,
  ILoginQrRes
} from 'interfaces/login'

// 二维码key生成接口
const loginQrKey = async (): Promise<ILoginQrRes> => {
  const res = await request({
    url: '/login/qr/key',
    method: 'get'
  })
  const res2 = await loginQrCreate(res.data.unikey)
  return res2.data
}

// 二维码生成接口
const loginQrCreate = unikey => {
  return request({
    url: '/login/qr/create',
    method: 'get',
    params: {
      key: unikey,
      qrimg: true
    }
  })
}

// 二维码检测扫码状态接口

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
