import React from 'react'

import { ReducerContext } from 'reducers'
import * as commonApis from 'apis/common'
import useAsyncRequest from 'hooks/useAsyncRequest'

import styles from './index.module.scss'

interface IProps {
  from: string
  visible?: boolean
}

const { useContext, useEffect } = React

/**
 * 歌词展示
 * 使用的模块 1. 全屏当前歌曲[screen] 2. 私人 FM[fm]
 */
const SongLyric: React.FC<IProps> = ({ from, visible }) => {
  const [state] = useContext(ReducerContext)
  const { currentPlaySong = {} } = state.musicPlayer
  const [songLyricState, getSongLyric] = useAsyncRequest(
    commonApis.getSongLyric
  )
  const { value: songLyricValue } = songLyricState
  const songLyric: any = songLyricValue && songLyricValue.lyric

  useEffect(
    () => {
      if (from === 'screen' && visible) {
        getSongLyric({
          id: currentPlaySong.id
        })
      }
    },
    [getSongLyric, visible, from]
  )

  return (
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
  )
}

export default SongLyric
