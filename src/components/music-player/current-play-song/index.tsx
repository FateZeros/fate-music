import React, { Fragment } from 'react'

import { formatSongTime } from 'utils'
import defaultMusicImg from 'assets/image/player/default-music.png'
import unfoldScreenImg from 'assets/image/player/music-unfold.png'
import foldScreenImg from 'assets/image/player/music-fold.png'

import styles from './index.module.scss'

interface IProps {
  playingSong: any
  playingCurrentTime: number
  isFoldPlayer: boolean
  onUnfoldMusicImg?: () => void
}

/**
 * 播放器 - 当前正在播放的音乐
 */
const CurrentPlaySong: React.FC<IProps> = ({
  playingSong,
  playingCurrentTime,
  isFoldPlayer = true,
  onUnfoldMusicImg
}) => {
  let songImg: any = defaultMusicImg
  if (playingSong && playingSong.al) {
    songImg = playingSong.al.picUrl
  }

  return (
    <div className={styles['music-info-wrap']}>
      {Number(playingSong && playingSong.id) ? (
        <Fragment>
          <div className={styles['music-info-img']} onClick={onUnfoldMusicImg}>
            <img src={songImg} alt="" loading="lazy" />
            <div className={styles['music-control-screen']}>
              <img
                src={isFoldPlayer ? unfoldScreenImg : foldScreenImg}
                alt=""
              />
            </div>
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
              / {formatSongTime(playingSong && playingSong.dt)}
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  )
}

export default CurrentPlaySong
