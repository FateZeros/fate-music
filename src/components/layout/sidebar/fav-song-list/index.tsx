import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

interface IProps {
  visible: Boolean
}

/**
 * menu - 收藏的歌单
 */
const FavSongList: React.FC<IProps> = ({ visible }) => {
  return (
    <ul className={cn(visible && styles['song-show'], styles['fav-song-list'])}>
      收藏的歌单
    </ul>
  )
}

export default FavSongList
