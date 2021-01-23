import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

interface IProps {
  visible: boolean
}

/**
 * 当前播放列表
 * 1. 播放列表 & 2.历史记录
 */
const CurrentPlaySongs: React.FC<IProps> = ({ visible }) => {
  return (
    <div
      className={cn(visible && styles['play-wrap-show'], styles['play-wrap'])}
    >
      1212
    </div>
  )
}

export default CurrentPlaySongs
