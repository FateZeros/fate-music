import React, { Fragment } from 'react'

import CurrentPlayList from './current-play-list'
import CurrentPlaySong from './current-play-song'
import PlayerMode from './player-mode'
import PlayerVolume from './player-volume'

import styles from './index.module.scss'

const { useState } = React

const MusicPlayer = () => {
  const [currentPlayListVisible, setCurrentPlayList] = useState(false)

  const handleShowCurrentPlaySongs = () => {
    setCurrentPlayList(!currentPlayListVisible)
  }

  console.log(currentPlayListVisible, '---------')

  return (
    <Fragment>
      <div className={styles['music-player-wrap']}>
        <div className={styles['music-play-progress']} />
        <CurrentPlaySong />
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
            onClick={() => handleShowCurrentPlaySongs()}
          />
          <div className={styles['music-setting-lyrics']} />
          <PlayerVolume />
        </div>
      </div>
      <CurrentPlayList
        visible={currentPlayListVisible}
        onCloseCurrentPlayList={() => setCurrentPlayList(false)}
      />
    </Fragment>
  )
}

export default MusicPlayer
