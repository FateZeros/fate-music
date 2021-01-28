import { setMusicPlayerList } from 'utils/music-player'

const musicPlayerState = {
  playList: []
}

const musicPlayerReducer = (state = musicPlayerState, action) => {
  switch (action.type) {
    case 'SET_MUSIC_PLAYER_LIST':
      setMusicPlayerList(action.payload)
      break
    default:
      return state
  }
}

export default musicPlayerReducer
