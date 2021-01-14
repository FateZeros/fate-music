import request from 'utils/request'

import { ILoginCellphoneRequest, ILoginCellphoneResponse } from './types/login'

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

export { loginCellphone, loginOut }
