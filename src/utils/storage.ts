import { FATE_MUSIC_VALID_DAY } from 'constants/constants'

export const DEFAULT_VALUE = {
  ARRAY: '[]',
  OBJECT: '{}',
  STRING: ''
}

interface IExpirseLocalStorageParams<T> {
  key: string
  defaultValue: string
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

interface IExpirseLocalStorageReturn<T> {
  setItem: (value: T) => void
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
  const {
    key,
    defaultValue,
    serializer = JSON.stringify,
    deserializer = JSON.parse
  } = params

  const setItem = (value: T) => {
    const data = serializer({
      info: value,
      expirse: setExpirseDate()
    }) as string
    window.localStorage.setItem(key, data || defaultValue)
  }

  const getItem = () => {
    const data = window.localStorage.getItem(key) || defaultValue
    const { info, expirse } = deserializer(data)
    if (expirse !== null && expirse < new Date().getTime()) {
      window.localStorage.removeItem(key)
      return defaultValue
    }
    return info || defaultValue
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
