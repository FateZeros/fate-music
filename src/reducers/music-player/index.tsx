import {
  setMusicPlayerList,
  setMusicPlayerMode,
  setMusicPlayerCurrentSong,
  setMusicPlayerVolume,
  PLAYER_MODE,
  getMusicPlayerMode,
  getMusicPlayerList
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
  currentPlaySong: {},
  // 是否正在播放音乐
  isPlayingSong: false,
  // 音乐播放器的音量 默认50%
  playerVolume: 50
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

      const playerMode = state.playerMode || getMusicPlayerMode()
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
    case 'CHANGE_CURRENT_PLAY_SONG': {
      const { currentPlaySong, currentPlayList, playerMode } = state
      const songsLen = currentPlayList.length
      const { direction } = action.payload
      let changePlaySong = {}
      if (playerMode === PLAYER_MODE.PLAY_RANDOM) {
        const randomIndex = randomNumber(songsLen, 0)
        changePlaySong = currentPlayList[randomIndex]
      } else {
        console.log(currentPlayList, '11111')
        // const currentPlaySongIndex = currentPlayList.findIndex(item => item.id === currentPlaySong.id)
        // if (direction === 'pre') {
        // } else {
        // }
      }
    }
    case 'TOGGLE_PLAYING_SONG': {
      const { isPlayingSong } = action.payload
      return {
        ...state,
        isPlayingSong
      }
    }
    case 'SET_MUSIC_PLAYER_VOLUME': {
      const { playerVolume } = action.payload
      setMusicPlayerVolume(playerVolume)
      return {
        ...state,
        playerVolume
      }
    }
    default:
      return state
  }
}

export default musicPlayerReducer
