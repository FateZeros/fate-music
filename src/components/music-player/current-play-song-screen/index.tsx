import React from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'

import styles from './index.module.scss'

interface IProps {
  visible: boolean
}

const { useContext } = React
/*
 * 全屏展示当前播放的音乐 & 歌词
 */
const CurrentPlaySongScreen: React.FC<IProps> = ({ visible }) => {
  const [state, dispatch] = useContext(ReducerContext)
  const { currentPlaySong = {}, isPlayingSong = false } = state.musicPlayer
  console.log(currentPlaySong, isPlayingSong)

  return (
    <div
      className={cn(styles['screen-wrap'], visible && styles['screen-show'])}
    >
      <div className={styles['playing-music-info']}>
        <div className={styles['playing-song-action']}>
          <div className={styles['playing-song-img']}>
            <div
              className={cn(
                styles['playing-song-rocker'],
                isPlayingSong && styles['playing-on-rocker']
              )}
            />
            <img
              src={currentPlaySong.al && currentPlaySong.al.picUrl}
              loading="lazy"
              alt=""
            />
          </div>
        </div>
        <div className={styles['playing-song-lyric']} />
      </div>
    </div>
  )
}

export default CurrentPlaySongScreen
