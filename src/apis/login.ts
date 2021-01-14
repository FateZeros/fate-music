import request from 'utils/request'

import { ILoginCellphoneRequest, ILoginCellphoneResponse } from './types/login'

type LoginCellphoneFn = (
  params: ILoginCellphoneRequest
) => Promise<ILoginCellphoneResponse>

const loginCellphone: LoginCellphoneFn = payload => {
  return request({
    url: '/login/cellphone',
    method: 'post',
    data: payload
  })
}

export default { loginCellphone }
