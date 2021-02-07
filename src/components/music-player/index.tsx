import React from 'react'

import { ReducerContext } from 'reducers'

import CurrentPlayList from './current-play-list'
import CurrentPlaySong from './current-play-song'
import PlayerMode from './player-mode'
import PlayerVolume from './player-volume'
import styles from './index.module.scss'

const { Fragment, useContext, useRef } = React

const MusicPlayer = () => {
  const musicAudioRef = useRef<HTMLElement | null>(null)

  const [state, dispatch] = useContext(ReducerContext)
  const { currentPlayListVisible } = state.musicPlayer

  const handleShowCurrentPlaySongs = () => {
    dispatch({
      type: 'SHOW_CURRENT_PLAY_LIST',
      payload: {
        visible: !currentPlayListVisible
      }
    })
  }

  return (
    <Fragment>
      <div className={styles['music-player-wrap']}>
        <div className={styles['music-play-progress']} />
        {/** player 当前播放的音乐 */}
        <CurrentPlaySong />
        {/** player 控制台 */}
        <div className={styles['music-action-wrap']}>
          <div className={styles['music-action-collect']} />
          <div className={styles['music-play-wrap']}>
            <div className={styles['music-action-pre']} />
            <div className={styles['music-action-play']} />
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
          <audio ref={ref => (musicAudioRef.current = ref)}>
            您的浏览器不支持音乐播放
          </audio>
        </div>
      </div>
      <CurrentPlayList />
    </Fragment>
  )
}

export default MusicPlayer
