import React, { useContext } from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import { getMusicPlayerMode, PLAYER_MODE } from 'utils/music-player'

import styles from './index.module.scss'
/**
 * 音乐播放器 - 播放模式
 */
const PlayerMode = () => {
  const [state, dispatch] = useContext(ReducerContext)
  const { playerMode } = state.musicPlayer
  const mode = playerMode || getMusicPlayerMode() || PLAYER_MODE.PLAY_CYCLE

  const handleChangePlayerMode = () => {
    const modeArr = ['cycle', 'sort', 'one', 'random']
    const currentIndex: number = modeArr.findIndex(item => mode === item)
    let nextIndex: number = currentIndex + 1
    if (nextIndex > 3) {
      nextIndex = 0
    }
    dispatch({
      type: 'SET_MUSIC_PLAYER_MODE',
      payload: {
        playerMode: modeArr[nextIndex]
      }
    })
  }

  return (
    <div
      className={cn(styles['music-play-mode'], styles[`mode-img-${mode}`])}
      onClick={handleChangePlayerMode}
    />
  )
}

export default PlayerMode
