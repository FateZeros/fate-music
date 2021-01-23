import React, { Fragment } from 'react'

import CurrentPlaySongs from './current-play-songs'
import PlayerMode from './player-mode'
import PlayerVolume from './player-volume'

import styles from './index.module.scss'
import defaultMusicImg from 'assets/image/player/default-music.png'

const { useState, useCallback } = React

const MusicPlayer = () => {
  const [currentPlaySongsVisible, setCurrentPlaySongs] = useState(false)

  const handleShowCurrentPlaySongs = useCallback(
    () => {
      setCurrentPlaySongs(!currentPlaySongsVisible)
    },
    [currentPlaySongsVisible, setCurrentPlaySongs]
  )

  return (
    <Fragment>
      <div className={styles['music-player-wrap']}>
        <div className={styles['music-play-progress']} />
        <div className={styles['music-info-wrap']}>
          <div className={styles['music-info-img']}>
            <img src={defaultMusicImg} alt="" />
            <div className={styles['music-fold-screen']} />
          </div>
          <div className={styles['music-info-rows']}>
            <div className={styles['music-info']}>
              <div className={styles['music-name']}>Open your eye</div>
              <div className={styles['music-author']}>- Ausoorrhe / Kaye</div>
            </div>
            <div className={styles['music-time']}>03:00 / 05:22</div>
          </div>
        </div>
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
          <PlayerMode />
          <div
            className={styles['music-setting-song-list']}
            onClick={handleShowCurrentPlaySongs}
          />
          <div className={styles['music-setting-lyrics']} />
          <PlayerVolume />
        </div>
      </div>
      <CurrentPlaySongs visible={currentPlaySongsVisible} />
    </Fragment>
  )
}

export default MusicPlayer
