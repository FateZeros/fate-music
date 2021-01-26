import request from 'utils/request'

import {
  ILoginCellphoneRequest,
  ILoginCellphoneResponse,
  ILoginQrkeyRes
} from 'interfaces/login'

const dateTime = new Date().getTime()

// 二维码key生成接口
const loginQrKey = async (): Promise<ILoginQrkeyRes> => {
  const res = await request({
    url: `/login/qr/key?timerstamp=${dateTime}`,
    method: 'get'
  })
  return res.data
}

// 二维码生成接口
const loginQrCreate = async unikey => {
  const res = await request({
    url: '/login/qr/create',
    method: 'get',
    params: {
      key: unikey,
      qrimg: true,
      timerstamp: dateTime
    }
  })
  return res.data
}

/*
 * 二维码检测扫码状态接口
 * 800 二维码已过期
 * 801 等待扫码
 * 803 已扫码
 */
const loginQrCheck = async unikey => {
  const res = await request({
    url: '/login/qr/check',
    method: 'get',
    params: {
      key: unikey,
      timerstamp: dateTime
    }
  })
  return res
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
const logout = () => {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 登录状态 - 登录信息
const getLoginStatus = async () => {
  const res = await request({
    url: '/login/status',
    method: 'get',
    params: {
      timerstamp: dateTime
    }
  })
  return res.data
}

export {
  loginQrKey,
  loginQrCreate,
  loginQrCheck,
  loginCellphone,
  logout,
  getLoginStatus
}
