import React from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import {
  getMusicPlayerCurrentSong,
  getMusicPlayerMode,
  getMusicPlayerVolume
} from 'utils/music-player'
import * as commonApis from 'apis/common'
import useAsyncRequest from 'hooks/useAsyncRequest'
import * as clientMethods from 'client'
import LinkTitle from 'components/link-title'
import ROUTES from 'constants/routes'

import CurrentPlaySong from '../music-player/current-play-song'
import styles from './index.module.scss'

// 是否 electron 环境
const win: any = window
const isElectron = win.ENV_ELECTRON

const { Fragment, useContext, useState, useEffect, useRef } = React

/**
 * mini 播放器，主要用于 electron 缩小后显示
 * 同时兼容 web 页面
 */
const MiniMusicPlayer = () => {
  const musicAudioRef = useRef<HTMLMediaElement | null>(null)
  const [state, dispatch] = useContext(ReducerContext)
  const { currentPlaySong, isPlayingSong } = state.musicPlayer

  const [playingCurrentTime, setCurrentTime] = useState(0)
  // 是否折叠 mini 播放器
  const [isFoldMiniPlayer, setFoldMiniPlayer] = useState(true)

  const [songState, getSongUrl] = useAsyncRequest(commonApis.getSongUrl)
  const { value: songValue } = songState

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

  useEffect(
    () => {
      if (currentPlaySong.id) {
        getSongUrl({
          id: currentPlaySong.id
        }).then(() => {
          if (musicAudioRef.current && isPlayingSong) {
            musicAudioRef.current.autoplay = true
          }
        })
      }
    },
    // eslint-disable-next-line
    [currentPlaySong, musicAudioRef]
  )

  const handleAudioTimeUpdate = e => {
    setCurrentTime(e.target.currentTime * 1000)
  }

  const handleChangePlayingSong = direction => {
    dispatch({
      type: 'CHANGE_CURRENT_PLAY_SONG',
      payload: {
        direction
      }
    })
  }

  // 最小化
  const handleMiniPlayerClose = () => {
    clientMethods.minimizeMinMusicPlayer()
  }

  const handleShowMusicPlayer = () => {
    clientMethods.maxMinMusicPlayer()
  }

  const handleUnfoldMusicImg = () => {
    clientMethods.unFoldMiniMusicPlayer(!isFoldMiniPlayer)
    setFoldMiniPlayer(!isFoldMiniPlayer)
  }

  return (
    <Fragment>
      {!isElectron && (
        <div className={styles['back-row']}>
          <LinkTitle
            title="Mini播放器"
            route={ROUTES.DISCOVERY}
            backType={true}
          />
        </div>
      )}
      <div
        className={cn(
          !isElectron && styles['mini-player-dev'],
          styles['mini-player'],
          !isFoldMiniPlayer && styles['unfold-mini-player']
        )}
      >
        <div className={styles['mini-actions']}>
          <div
            className={styles['mini-close']}
            onClick={handleMiniPlayerClose}
          />
          <div
            className={styles['mini-scale']}
            onClick={handleShowMusicPlayer}
          />
        </div>
        <div className={styles['container']}>
          <div className={styles['mini-current-song']}>
            {/** player 当前播放的音乐 */}
            <CurrentPlaySong
              playingSong={currentPlaySong}
              playingCurrentTime={playingCurrentTime}
              onUnfoldMusicImg={handleUnfoldMusicImg}
              isFoldPlayer={isFoldMiniPlayer}
            />
          </div>
        </div>
      </div>
      {!isElectron && (
        <div className={styles['mini-player-tips']}>
          这是 web 版 mini music player, 在 APP 中使用功能更全面～
        </div>
      )}
      <audio
        preload="metadata"
        ref={el => (musicAudioRef.current = el)}
        src={songValue && songValue.url}
        onTimeUpdate={e => handleAudioTimeUpdate(e)}
        onEnded={() => handleChangePlayingSong('next')}
      >
        您的浏览器不支持音乐播放
      </audio>
    </Fragment>
  )
}

export default MiniMusicPlayer
