import React from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import * as commonApis from 'apis/common'
import useAsyncRequest from 'hooks/useAsyncRequest'

import styles from './index.module.scss'

interface IProps {
  visible: boolean
}

const { useContext, useEffect } = React
/*
 * 全屏展示当前播放的音乐 & 歌词
 */
const CurrentPlaySongScreen: React.FC<IProps> = ({ visible }) => {
  const [state, dispatch] = useContext(ReducerContext)
  const { currentPlaySong = {}, isPlayingSong = false } = state.musicPlayer
  console.log(currentPlaySong, isPlayingSong)

  const [songLyricState, getSongLyric] = useAsyncRequest(
    commonApis.getSongLyric
  )
  const { value: songLyricValue } = songLyricState
  console.log(songLyricValue, 1111)
  const songLyric: any = songLyricValue && songLyricValue.lyric

  useEffect(
    () => {
      if (visible) {
        getSongLyric({
          id: currentPlaySong.id
        })
      }
    },
    [getSongLyric, visible]
  )

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
        <div className={styles['playing-song-lyric-warp']}>
          <div className={styles['playing-song-name-row']}>
            {currentPlaySong.name}
          </div>
          <div className={styles['playing-song-info']}>
            歌曲专辑：<span>{currentPlaySong.arName}</span>
          </div>
          <div
            className={styles['playing-song-lyric']}
            dangerouslySetInnerHTML={{ __html: songLyric }}
          />
        </div>
      </div>
    </div>
  )
}

export default CurrentPlaySongScreen
