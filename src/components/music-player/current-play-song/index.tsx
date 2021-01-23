import React from 'react'

import styles from './index.module.scss'
import defaultMusicImg from 'assets/image/player/default-music.png'

/**
 * 播放器 - 当前正在播放的音乐
 */
const CurrentPlaySong = () => {
  return (
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
  )
}

export default CurrentPlaySong
