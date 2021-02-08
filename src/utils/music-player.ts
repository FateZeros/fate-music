import { expirseLocalStorage, DEFAULT_VALUE } from './storage'

enum PLAYER_KEYS {
  PLAYER_LIST = 'FATE_MUSIC_PLAYER_LIST',
  PLAYER_HISTORY = 'FATE_MUSIC_PLAYER_HISTORY',
  PLAYER_MODE = 'FATE_MUSIC_PLAYER_MODE',
  PLAYER_CURRENT_SONG = 'FATE_MUSIC_PLAYER_CURRENT_SONG',
  PLAYER_VOLUME = 'FATE_MUSIC_PLAYER_VOLUME'
}

export enum PLAYER_MODE {
  // 顺序播放
  PLAY_SORT = 'sort',
  // 单曲循环
  PLAY_ONE = 'one',
  // 随机播放
  PLAY_RANDOM = 'random',
  // 列表循环
  PLAY_CYCLE = 'cycle'
}

// 当前播放列表
export const musicPlayerList = expirseLocalStorage({
  key: PLAYER_KEYS.PLAYER_LIST,
  defaultValue: DEFAULT_VALUE.ARRAY,
  setExpirseDateValue: false
})

export const setMusicPlayerList = list => {
  musicPlayerList.setItem(list)
}

export const getMusicPlayerList = () => {
  return musicPlayerList.getItem()
}

// 历史播放列表
export const musicPlayerHistory = expirseLocalStorage({
  key: PLAYER_KEYS.PLAYER_HISTORY,
  defaultValue: DEFAULT_VALUE.ARRAY,
  setExpirseDateValue: false
})

export const getMusicHistoryList = () => {
  return musicPlayerHistory.getItem()
}

export const setMusicHistoryList = songItem => {
  const historySongs: any = getMusicHistoryList()
  const newHistorySongs = historySongs.push(songItem).reverse()
  musicPlayerHistory.setItem(newHistorySongs)
}

// 播放模式
export const musicPlayerMode = expirseLocalStorage({
  key: PLAYER_KEYS.PLAYER_MODE,
  defaultValue: DEFAULT_VALUE.STRING,
  setExpirseDateValue: false,
  raw: false
})

export const setMusicPlayerMode = (mode: PLAYER_MODE) => {
  musicPlayerMode.setItem(mode)
}

export const getMusicPlayerMode = () => {
  return musicPlayerMode.getItem()
}

// 当前播放的音乐
export const musicPlayerCurrentPlaySong = expirseLocalStorage({
  key: PLAYER_KEYS.PLAYER_CURRENT_SONG,
  setExpirseDateValue: false,
  defaultValue: DEFAULT_VALUE.OBJECT
})

export const setMusicPlayerCurrentSong = currentSong => {
  musicPlayerCurrentPlaySong.setItem(currentSong)
}

export const getMusicPlayerCurrentSong = () => {
  return musicPlayerCurrentPlaySong.getItem()
}

// 播放器音量
export const musicPlayerVolume = expirseLocalStorage({
  key: PLAYER_KEYS.PLAYER_VOLUME,
  setExpirseDateValue: false,
  defaultValue: DEFAULT_VALUE.STRING,
  raw: false
})

export const setMusicPlayerVolume = volume => {
  musicPlayerVolume.setItem(volume)
}
export const getMusicPlayerVolume = () => {
  return musicPlayerVolume.getItem()
}
