import { expirseLocalStorage, DEFAULT_VALUE } from './storage'
import { ILoginCellphoneResponse } from 'interfaces/login'

export const userInfoStorage = expirseLocalStorage({
  key: 'FATA_MUSIC_USER_INFO',
  defaultValue: DEFAULT_VALUE.OBJECT
})

export const setUserInfo = (userInfo: ILoginCellphoneResponse) => {
  userInfoStorage.setItem(userInfo)
}

export const getUserInfo = () => {
  return userInfoStorage.getItem()
}

export const removeUserInfo = () => {
  removeCookie()
  userInfoStorage.removeItem()
}

// 清除 cookie
const removeCookie = (): void => {
  const keys = document.cookie.match(/[^ =;]+(?==)/g)
  if (keys) {
    keys.forEach(item => {
      document.cookie = `${item}=0;expires=0`
    })
  }
}
