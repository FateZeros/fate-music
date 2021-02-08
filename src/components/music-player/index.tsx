import React from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import { getMusicPlayerCurrentSong } from 'utils/music-player'
import * as commonApis from 'apis/common'
import useAsyncRequest from 'hooks/useAsyncRequest'

import CurrentPlayList from './current-play-list'
import CurrentPlaySong from './current-play-song'
import PlayerMode from './player-mode'
import PlayerVolume from './player-volume'
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

  const [playingCurrentTime, setCurrentTime] = useState('00:00')

  // 当前正在播放的歌曲
  let playingSong: any = currentPlaySong
  if (!Number(currentPlaySong.id)) {
    playingSong = getMusicPlayerCurrentSong()
  }

  useEffect(() => {
    if (playingSong.id) {
      getSongUrl({
        id: playingSong.id
      })
    }
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

  const handleAudioTimeUpdate = e => {
    console.log(e.target.currentTime, 1212)
    setCurrentTime(e.target.currentTime)
  }

  return (
    <Fragment>
      <div className={styles['music-player-wrap']}>
        <div className={styles['music-play-progress']} />
        {/** player 当前播放的音乐 */}
        <CurrentPlaySong
          playingSong={playingSong}
          playingCurrentTime={playingCurrentTime}
        />
        {/** player 控制台 */}
        <div className={styles['music-action-wrap']}>
          <div className={styles['music-action-collect']} />
          <div className={styles['music-play-wrap']}>
            <div className={styles['music-action-pre']} />
            <div
              className={cn(
                isPlayingSong
                  ? styles['music-action-play']
                  : styles['music-action-pouse']
              )}
              onClick={handleTogglePlaying}
            />
            <div className={styles['music-action-next']} />
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
