import { FATE_MUSIC_VALID_DAY } from 'constants/constants'

interface IExpirseLocalStorageParams<T> {
  key: string
  info?: T
}

interface IExpirseLocalStorageReturn<T> {
  setItem: (info: T) => void
  getItem: () => T
  removeItem: () => void
}

const setExpirseDate = (): number => {
  const nowDate = new Date().getTime()
  // 过期时间 - Day
  const expirseDate = nowDate + FATE_MUSIC_VALID_DAY * 24 * 60 * 60 * 1000
  const expirseDateTime = new Date(expirseDate).getTime()
  return expirseDateTime
}

export const expirseLocalStorage = <T>(
  params: IExpirseLocalStorageParams<T>
): IExpirseLocalStorageReturn<T> => {
  const { key } = params

  const setItem = (info: T) => {
    const data: Object = {
      value: info,
      expirse: setExpirseDate()
    }
    window.localStorage.setItem(key, JSON.stringify(data))
  }

  const getItem = () => {
    const data = window.localStorage.getItem(key) || null
    if (data !== null) {
      const { value, expirse } = JSON.parse(data)
      if (expirse !== null && expirse < new Date().getTime()) {
        window.localStorage.removeItem(key)
      } else {
        return value
      }
    }
    return null
  }

  const removeItem = () => {
    window.localStorage.removeItem(key)
  }

  return {
    setItem,
    getItem,
    removeItem
  }
}
