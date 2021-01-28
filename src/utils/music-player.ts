import { expirseLocalStorage } from './storage'

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
  key: PLAYER_KEYS.PLAYER_LIST
})

export const setMusicPlayerList = (list: []) => {
  musicPlayerList.setItem(list)
}

export const getMusicPlayerList = () => {
  return musicPlayerList.getItem()
}

export const musicPlayerHistory = expirseLocalStorage({
  key: PLAYER_KEYS.PLAYER_HISTORY
})

export const getMusicHistoryList = () => {
  return musicPlayerHistory.getItem()
}
