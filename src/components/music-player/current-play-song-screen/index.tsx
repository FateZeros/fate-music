import React from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import SongLyric from 'components/song-lyric'

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
  // console.log(currentPlaySong, isPlayingSong)

  return (
    <div
      className={cn(styles['screen-wrap'], visible && styles['screen-show'])}
    >
      <div className={styles['playing-music-info']}>
        <div className={styles['playing-song-action']}>
          <div
            className={cn(
              styles['playing-song-img'],
              isPlayingSong && styles['playing-song-rotating']
            )}
          >
            <img
              src={currentPlaySong.al && currentPlaySong.al.picUrl}
              loading="lazy"
              alt=""
            />
          </div>
          <div
            className={cn(
              styles['playing-song-rocker'],
              isPlayingSong && styles['playing-on-rocker']
            )}
          />
          <div className={styles['playing-song-rocker-dot']} />
        </div>
        <SongLyric from="screen" visible={visible} />
      </div>
    </div>
  )
}

export default CurrentPlaySongScreen
