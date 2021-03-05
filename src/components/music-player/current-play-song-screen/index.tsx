import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

interface IProps {
  visible: boolean
}

/*
 * 全屏展示当前播放的音乐 & 歌词
 */
const CurrentPlaySongScreen: React.FC<IProps> = ({ visible }) => {
  return (
    <div
      className={cn(styles['screen-wrap'], visible && styles['screen-show'])}
    />
  )
}

export default CurrentPlaySongScreen
