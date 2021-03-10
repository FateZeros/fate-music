import request from 'utils/request'

import { IPersonalFMRes } from 'interfaces/fm'

// 获取私人 FM
const getPersonalFM = async (): Promise<IPersonalFMRes[]> => {
  const res = await request({
    url: '/personal_fm',
    method: 'get'
  })
  return res.data
}

export { getPersonalFM }
