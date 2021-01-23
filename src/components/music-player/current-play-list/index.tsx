import React from 'react'
import cn from 'classnames'

import useClickAway from 'hooks/useClickAway'

import styles from './index.module.scss'

interface IProps {
  visible: boolean
  onClickAway: () => void
}

const { useRef } = React

/**
 * 当前播放列表
 * 1. 播放列表 & 2.历史记录
 */
const CurrentPlayList: React.FC<IProps> = ({ visible, onClickAway }) => {
  const currentPlayListRef = useRef<HTMLDivElement | null>(null)
  useClickAway(currentPlayListRef, () => onClickAway())

  return (
    <div
      className={cn(visible && styles['play-wrap-show'], styles['play-wrap'])}
      ref={ref => (currentPlayListRef.current = ref)}
    >
      播放列表
    </div>
  )
}

export default CurrentPlayList
