import React from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import {
  getMusicPlayerCurrentSong,
  getMusicPlayerMode,
  getMusicPlayerVolume
} from 'utils/music-player'

import CurrentPlaySong from '../music-player/current-play-song'
import styles from './index.module.scss'

// 是否开发环境
const isDev = process.env.REACT_APP_NODE_ENV === 'development'
const { Fragment, useContext, useState, useEffect } = React
/**
 * mini 播放器，主要用于 electron 缩小后显示
 */
const MiniMusicPlayer = () => {
  const [state, dispatch] = useContext(ReducerContext)
  const { currentPlaySong } = state.musicPlayer

  const [playingCurrentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    // 1. 初始化当前播放音乐
    dispatch({
      type: 'SET_CURRENT_PLAY_SONG',
      payload: {
        currentPlaySong: getMusicPlayerCurrentSong()
      }
    })
    // 2. 初始化播放模式
    dispatch({
      type: 'SET_MUSIC_PLAYER_MODE',
      payload: {
        playerMode: getMusicPlayerMode()
      }
    })
    // 3. 初始化播放音量
    dispatch({
      type: 'SET_MUSIC_PLAYER_VOLUME',
      payload: {
        playerVolume: getMusicPlayerVolume()
      }
    })
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <div
        className={cn(
          isDev && styles['mini-player-dev'],
          styles['mini-player']
        )}
      >
        <div className={styles['mini-actions']}>
          <div className={styles['mini-close']} />
          <div className={styles['mini-scale']} />
        </div>
        <div className={styles['container']}>
          <div className={styles['mini-current-song']}>
            {/** player 当前播放的音乐 */}
            <CurrentPlaySong
              playingSong={currentPlaySong}
              playingCurrentTime={playingCurrentTime}
            />
          </div>
        </div>
      </div>
      {isDev && (
        <div className={styles['mini-player-tips']}>
          这是 web 版 mini music player, 在 APP 下使用功能更全面～
        </div>
      )}
    </Fragment>
  )
}

export default MiniMusicPlayer
