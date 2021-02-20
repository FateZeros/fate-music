import { expirseLocalStorage, DEFAULT_VALUE } from './storage'

enum SEARCH_KEYS {
  SEARCH_HISTORY = 'FATE_MUSIC_SEARCH_HISTORY'
}

// 搜索历史记录
export const searchHistory = expirseLocalStorage({
  key: SEARCH_KEYS.SEARCH_HISTORY,
  defaultValue: DEFAULT_VALUE.ARRAY,
  setExpirseDateValue: false
})

export const setSearchHistory = list => {
  searchHistory.setItem(list)
}

export const getSearchHistory = () => {
  return searchHistory.getItem()
}

export const removeSearchHistory = () => {
  searchHistory.removeItem()
}
