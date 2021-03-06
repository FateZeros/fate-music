import { expirseLocalStorage, DEFAULT_VALUE } from './storage'

// 播放器主题色
export const themeColorStorage = expirseLocalStorage({
  key: 'FATE_MUSIC_THEME',
  defaultValue: DEFAULT_VALUE.STRING,
  setExpirseDateValue: false,
  raw: false
})

export const setThemeColor = (themeColor: string) => {
  themeColorStorage.setItem(themeColor)
}

export const getThemeColor = () => {
  return themeColorStorage.getItem()
}

export const removeThemeColor = () => {
  themeColorStorage.removeItem()
}
