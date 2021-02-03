import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

interface IProps {
  visible: Boolean
}
/**
 * menu - 创建的歌单
 */
const CreateSongList: React.FC<IProps> = ({ visible }) => {
  return (
    <ul
      className={cn(visible && styles['song-show'], styles['create-song-list'])}
    >
      创建的歌单
    </ul>
  )
}

export default CreateSongList
