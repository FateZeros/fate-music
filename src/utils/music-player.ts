import { expirseLocalStorage, DEFAULT_VALUE } from './storage'

enum PLAYER_KEYS {
  PLAYER_LIST = 'FATE_MUSIC_PLAYER_LIST',
  PLAYER_HISTORY = 'FATA_MUSIC_PLAYER_HISTORY',
  PLAYER_MODE = 'FATE_MUSIC_PLAYER_MODE'
}

enum PLAYER_MODE {
  PLAY_ORDER = 'FATE_MUSIC_PLAY_ORDER',
  PLAY_SINGLE = 'FATE_MUSIC_PLAY_SINGLE',
  PLAY_SHUFFLE = 'FATE_MUSIC_PLAY_'
}

export const musicPlayerList = expirseLocalStorage({
  key: PLAYER_KEYS.PLAYER_LIST,
  defaultValue: DEFAULT_VALUE.ARRAY
})

export const setMusicPlayerList = list => {
  musicPlayerList.setItem(list)
}

export const getMusicPlayerList = () => {
  return musicPlayerList.getItem()
}

export const removeMusicPlayerList = () => {
  musicPlayerList.removeItem()
}

export const musicPlayerHistory = expirseLocalStorage({
  key: PLAYER_KEYS.PLAYER_HISTORY,
  defaultValue: DEFAULT_VALUE.ARRAY
})

export const getMusicHistoryList = () => {
  return musicPlayerHistory.getItem()
}

export const setMusicHistoryList = songItem => {
  const historySongs: any = getMusicHistoryList()
  const newHistorySongs = historySongs.push(songItem).reverse()
  musicPlayerHistory.setItem(newHistorySongs)
}

export const removeMusicHistoryList = () => {
  musicPlayerHistory.removeItem()
}
