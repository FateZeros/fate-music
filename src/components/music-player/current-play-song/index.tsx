import React, { Fragment } from 'react'

import { formatSongTime } from 'utils'

import styles from './index.module.scss'
import defaultMusicImg from 'assets/image/player/default-music.png'

interface IProps {
  playingSong: any
  playingCurrentTime: number
}

/**
 * 播放器 - 当前正在播放的音乐
 */
const CurrentPlaySong: React.FC<IProps> = ({
  playingSong,
  playingCurrentTime
}) => {
  let songImg: any = defaultMusicImg
  if (playingSong.al) {
    songImg = playingSong.al.picUrl
  }

  return (
    <div className={styles['music-info-wrap']}>
      {Number(playingSong.id) ? (
        <Fragment>
          <div className={styles['music-info-img']}>
            <img src={songImg} alt="" loading="lazy" />
            <div className={styles['music-fold-screen']} />
          </div>
          <div className={styles['music-info-rows']}>
            <div className={styles['music-info']}>
              <div className={styles['music-name']}>{playingSong.name}</div>
              <div className={styles['music-author']}>{playingSong.arName}</div>
            </div>
            <div className={styles['music-time']}>
              {playingCurrentTime > 0
                ? formatSongTime(playingCurrentTime)
                : '00:00'}
              / {formatSongTime(playingSong.dt)}
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  )
}

export default CurrentPlaySong
