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

import CurrentPlayList from './current-play-list'
import CurrentPlaySong from './current-play-song'
import PlayerMode from './player-mode'
import PlayerVolume from './player-volume'
import CurrentPlayBar from './current-play-bar'
import styles from './index.module.scss'

const { Fragment, useContext, useEffect, useRef, useState } = React

const MusicPlayer = () => {
  const musicAudioRef = useRef<HTMLMediaElement | null>(null)

  const [state, dispatch] = useContext(ReducerContext)
  const {
    currentPlayListVisible,
    currentPlaySong,
    isPlayingSong
  } = state.musicPlayer

  const [songValue, getSongUrl] = useAsyncRequest(commonApis.getSongUrl)
  const { value: songUrlValue } = songValue

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

  useEffect(
    () => {
      if (currentPlaySong.id) {
        getSongUrl({
          id: currentPlaySong.id
        })
      }
    },
    // eslint-disable-next-line
    [currentPlaySong]
  )

  const handleShowCurrentPlaySongs = () => {
    dispatch({
      type: 'SHOW_CURRENT_PLAY_LIST',
      payload: {
        visible: !currentPlayListVisible
      }
    })
  }

  const handleTogglePlaying = () => {
    dispatch({
      type: 'TOGGLE_PLAYING_SONG',
      payload: {
        isPlayingSong: !isPlayingSong
      }
    })
  }

  const handleChangePlayingSong = direction => {
    dispatch({
      type: 'CHANGE_CURRENT_PLAY_SONG',
      payload: {
        direction
      }
    })
  }

  const handleAudioTimeUpdate = e => {
    setCurrentTime(e.target.currentTime * 1000)
  }

  return (
    <Fragment>
      <div className={styles['music-player-wrap']}>
        <CurrentPlayBar
          playingCurrentTime={playingCurrentTime}
          playingSong={currentPlaySong}
        />
        {/** player 当前播放的音乐 */}
        <CurrentPlaySong
          playingSong={currentPlaySong}
          playingCurrentTime={playingCurrentTime}
        />
        {/** player 控制台 */}
        <div className={styles['music-action-wrap']}>
          <div className={styles['music-action-collect']} />
          <div className={styles['music-play-wrap']}>
            <div
              className={styles['music-action-pre']}
              onClick={() => handleChangePlayingSong('pre')}
            />
            <div
              className={cn(
                isPlayingSong
                  ? styles['music-action-play']
                  : styles['music-action-pouse']
              )}
              onClick={handleTogglePlaying}
            />
            <div
              className={styles['music-action-next']}
              onClick={() => handleChangePlayingSong('next')}
            />
          </div>
          <div className={styles['music-action-share']} />
        </div>
        <div className={styles['music-setting-wrap']}>
          <div className={styles['music-setting-cloud']} />
          {/** player 播放模式 */}
          <PlayerMode />
          <div
            className={styles['music-setting-song-list']}
            onClick={handleShowCurrentPlaySongs}
          />
          <div className={styles['music-setting-lyrics']} />
          {/** player 播放音量 */}
          <PlayerVolume />
          <audio
            preload="metadata"
            ref={el => (musicAudioRef.current = el)}
            src={songUrlValue && songUrlValue.url}
            onTimeUpdate={e => handleAudioTimeUpdate(e)}
          >
            您的浏览器不支持音乐播放
          </audio>
        </div>
      </div>
      <CurrentPlayList />
    </Fragment>
  )
}

export default MusicPlayer
