import { setMusicPlayerList } from 'utils/music-player'

const musicPlayerState = {
  currentPlayListVisible: false,
  playList: []
}

const musicPlayerReducer = (state = musicPlayerState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PLAY_LIST':
      const { visible } = action.payload
      return {
        ...state,
        currentPlayListVisible: visible
      }
    case 'SET_MUSIC_PLAYER_LIST':
      setMusicPlayerList(action.payload)
      break
    default:
      return state
  }
}

export default musicPlayerReducer
