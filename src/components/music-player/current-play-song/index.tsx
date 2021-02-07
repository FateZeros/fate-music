import React, { useContext, Fragment } from 'react'

import { getMusicPlayerCurrentSong } from 'utils/music-player'
import { ReducerContext } from 'reducers'
import { formatSongTime } from 'utils'

import styles from './index.module.scss'
import defaultMusicImg from 'assets/image/player/default-music.png'
/**
 * 播放器 - 当前正在播放的音乐
 */
const CurrentPlaySong = () => {
  const [state] = useContext(ReducerContext)
  const { currentPlaySong } = state.musicPlayer

  // 当前正在播放的歌曲
  let playSong: any = currentPlaySong
  if (!Number(currentPlaySong.id)) {
    playSong = getMusicPlayerCurrentSong()
  }

  let songImg: any = defaultMusicImg
  if (playSong.al) {
    songImg = playSong.al.picUrl
  }

  return (
    <div className={styles['music-info-wrap']}>
      {Number(playSong.id) ? (
        <Fragment>
          <div className={styles['music-info-img']}>
            <img src={songImg} alt="" loading="lazy" />
            <div className={styles['music-fold-screen']} />
          </div>
          <div className={styles['music-info-rows']}>
            <div className={styles['music-info']}>
              <div className={styles['music-name']}>{playSong.name}</div>
              <div className={styles['music-author']}>{playSong.arName}</div>
            </div>
            <div className={styles['music-time']}>
              {'03:00'} / {formatSongTime(playSong.dt)}
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  )
}

export default CurrentPlaySong
