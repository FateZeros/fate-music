import React from 'react'

import { ReducerContext } from 'reducers'

import CurrentPlayList from './current-play-list'
import CurrentPlaySong from './current-play-song'
import PlayerMode from './player-mode'
import PlayerVolume from './player-volume'
import styles from './index.module.scss'

const { Fragment, useContext, useRef } = React

const MusicPlayer = () => {
  const [state, dispatch] = useContext(ReducerContext)
  const { currentPlayListVisible } = state.musicPlayer

  const openPlayListIconRef = useRef<HTMLDivElement | null>(null)

  const handleShowCurrentPlaySongs = () => {
    dispatch({
      type: 'SET_CURRENT_PLAY_LIST',
      payload: {
        visible: !currentPlayListVisible
      }
    })
  }

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
            onClick={handleShowCurrentPlaySongs}
            ref={ref => (openPlayListIconRef.current = ref)}
          />
          <div className={styles['music-setting-lyrics']} />
          <PlayerVolume />
        </div>
      </div>
      <CurrentPlayList openPlayListIconRef={openPlayListIconRef} />
    </Fragment>
  )
}

export default MusicPlayer
