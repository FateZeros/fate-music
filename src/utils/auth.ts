import { expirseLocalStorage } from './storage'
import { ILoginCellphoneResponse } from 'interfaces/login'

export const userInfoStorage = expirseLocalStorage({
  key: 'FATA_MUSIC_USER_INFO'
})

export const setUserInfo = (userInfo: ILoginCellphoneResponse) => {
  userInfoStorage.setItem(userInfo)
}

export const getUserInfo = () => {
  return userInfoStorage.getItem()
}

export const removeUserInfo = () => {
  userInfoStorage.removeItem()
}
