import {
  setMusicPlayerList,
  setMusicPlayerMode,
  setMusicPlayerCurrentSong,
  PLAYER_MODE
} from 'utils/music-player'
import { randomNumber } from 'utils'

const musicPlayerState = {
  currentPlayListVisible: false,
  // 当前音乐播放列表
  currentPlayList: [],
  // 历史音乐播放列表
  historyPlayList: [],
  // 音乐播放器模式
  playerMode: '',
  // 当前正在播放的音乐
  currentPlaySong: {}
}

const musicPlayerReducer = (state = musicPlayerState, action) => {
  switch (action.type) {
    case 'SHOW_CURRENT_PLAY_LIST':
      const { visible } = action.payload
      return {
        ...state,
        currentPlayListVisible: visible
      }
    case 'SET_CURRENT_PLAYER_LIST': {
      /**
       * 1. 设置当前播放列表
       * 2. 根据播放模式设置第一首播放的歌曲
       */
      const { songs } = action.payload
      setMusicPlayerList(songs)

      const playerMode = state.playerMode
      const songsLen = songs.length
      let currentPlaySong: any = {}
      if (playerMode === PLAYER_MODE.PLAY_RANDOM && songsLen) {
        const randomIndex = randomNumber(songsLen, 0)
        currentPlaySong = songs[randomIndex]
      } else {
        currentPlaySong = songs[0]
      }
      setMusicPlayerCurrentSong(currentPlaySong)

      return {
        ...state,
        currentPlayList: songs,
        currentPlaySong
      }
    }
    case 'SET_MUSIC_PLAYER_MODE':
      const { playerMode } = action.payload
      setMusicPlayerMode(playerMode)
      return {
        ...state,
        playerMode
      }
    case 'SET_CURRENT_PLAY_SONG': {
      const { currentPlaySong } = action.payload
      setMusicPlayerCurrentSong(currentPlaySong)
      return {
        ...state,
        currentPlaySong
      }
    }
    default:
      return state
  }
}

export default musicPlayerReducer
