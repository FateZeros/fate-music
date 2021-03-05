import React from 'react'

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
import PlayerAction from './player-action'
import PlayerSongLyrics from './player-song-lyrics'
import styles from './index.module.scss'

const { Fragment, useContext, useEffect, useRef, useState } = React

const MusicPlayer = () => {
  const musicAudioRef = useRef<HTMLMediaElement | null>(null)
  const currentPlaySongRef = useRef<HTMLElement | null>(null)

  const [state, dispatch] = useContext(ReducerContext)
  const {
    currentPlayListVisible,
    currentPlaySong = {},
    isPlayingSong
  } = state.musicPlayer

  const [songState, getSongUrl] = useAsyncRequest(commonApis.getSongUrl)
  const { value: songValue } = songState

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

  const handleShowCurrentPlaySongs = () => {
    dispatch({
      type: 'SHOW_CURRENT_PLAY_LIST',
      payload: {
        visible: !currentPlayListVisible
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
        {/** player 播放音乐进度跳 */}
        <CurrentPlayBar
          playingCurrentTime={playingCurrentTime}
          playingSong={currentPlaySong}
        />
        {/** player 当前播放的音乐 */}
        <CurrentPlaySong
          playingSong={currentPlaySong}
          playingCurrentTime={playingCurrentTime}
          from="player"
        />
        {/** player 控制台 */}
        <PlayerAction showCollectBtn={true} showShareBtn={true} />
        <div className={styles['music-setting-wrap']}>
          <div className={styles['music-setting-cloud']} />
          {/** player 播放模式 */}
          <PlayerMode />
          <div
            className={styles['music-setting-song-list']}
            onClick={handleShowCurrentPlaySongs}
            ref={ref => (currentPlaySongRef.current = ref)}
          />
          {/** 歌曲歌词 */}
          <PlayerSongLyrics />
          {/** player 播放音量 */}
          <PlayerVolume />
          <audio
            preload="metadata"
            ref={el => (musicAudioRef.current = el)}
            src={songValue && songValue.url}
            onTimeUpdate={e => handleAudioTimeUpdate(e)}
            onEnded={() => handleChangePlayingSong('next')}
          >
            您的浏览器不支持音乐播放
          </audio>
        </div>
      </div>
      <CurrentPlayList excludeRef={currentPlaySongRef} />
    </Fragment>
  )
}

export default MusicPlayer
