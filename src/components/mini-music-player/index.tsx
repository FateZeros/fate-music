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
import PlayerAction from 'components/music-player/player-action'
import PlayerSongCollect from 'components/music-player/player-song-collect'
import PlayerVolume from 'components/music-player/player-volume'
import PlayerSongLyrics from 'components/music-player/player-song-lyrics'

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
// 窗口操作 action
const MiniMusicPlayerWinAction = () => {
  // 最小化
  const handleMiniPlayerClose = () => {
    clientMethods.minimizeMinMusicPlayer()
  }

  const handleShowMusicPlayer = () => {
    clientMethods.maxMinMusicPlayer()
  }

  return (
    <div className={styles['mini-actions']}>
      <div className={styles['mini-close']} onClick={handleMiniPlayerClose} />
      <div className={styles['mini-scale']} onClick={handleShowMusicPlayer} />
    </div>
  )
}

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

  useEffect(
    () => {
      if (musicAudioRef.current) {
        if (isPlayingSong) {
          musicAudioRef.current.play()
        } else {
          musicAudioRef.current.pause()
        }
      }
    },
    [musicAudioRef, isPlayingSong]
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

  const handleUnfoldMusicImg = () => {
    setFoldMiniPlayer(!isFoldMiniPlayer)
    clientMethods.unFoldMiniMusicPlayer(!isFoldMiniPlayer)
  }

  const handleSongChange = () => {
    console.log('对歌曲进行更多操作')
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
          !isFoldMiniPlayer && isElectron && styles['unfold-mini-player1'],
          !isFoldMiniPlayer && !isElectron && styles['unfold-mini-player2']
        )}
      >
        <div
          className={cn(
            styles['full-img'],
            !isFoldMiniPlayer && styles['unfold-full-img']
          )}
        >
          <img src={currentPlaySong.al && currentPlaySong.al.picUrl} alt="" />
        </div>
        {!isFoldMiniPlayer && (
          <div className={styles['unfold-top-wrap']}>
            <MiniMusicPlayerWinAction />
            <div className={styles['song-title']}>{currentPlaySong.name}</div>
            <div className={styles['more']} onClick={handleSongChange} />
          </div>
        )}
        <div
          className={cn(
            styles['container'],
            !isFoldMiniPlayer && styles['hide']
          )}
        >
          {/** player win 操作按钮 */}
          {isFoldMiniPlayer && <MiniMusicPlayerWinAction />}
          {/** player 当前播放的音乐 */}
          <div
            className={cn(
              styles['mini-current-song'],
              !isFoldMiniPlayer && styles['fold-current-song']
            )}
          >
            <CurrentPlaySong
              playingSong={currentPlaySong}
              playingCurrentTime={playingCurrentTime}
              onUnfoldMusicImg={handleUnfoldMusicImg}
              isFoldPlayer={isFoldMiniPlayer}
            />
          </div>
          {/** player 操作 */}
          {!isFoldMiniPlayer && (
            <div className={styles['mini-player-action']}>
              <PlayerAction showCollectBtn={false} showShareBtn={false} />
            </div>
          )}
          {/** player 收藏按钮 */}
          <PlayerSongCollect />
          {/** player 歌曲歌词 */}
          <div className={styles['wd12']} />
          <PlayerSongLyrics />
          {/** player 播放音量 */}
          <div className={styles['wd12']} />
          <PlayerVolume />
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
