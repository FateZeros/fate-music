import React from 'react'
import cn from 'classnames'

import { IUserPlayListResponse } from 'interfaces/mysong-list'

import styles from '../index.module.scss'

interface IProps {
  visible: Boolean
  songList: IUserPlayListResponse[]
  userId: number
}

/**
 * menu - 收藏的歌单
 */
const FavSongList: React.FC<IProps> = ({ visible, songList, userId }) => {
  const favSongList: IUserPlayListResponse[] = []
  songList.forEach(item => {
    if (item.creator.userId !== userId) {
      favSongList.push(item)
    }
  })

  return (
    <ul className={cn(visible && styles['song-show'], styles['fav-song-list'])}>
      {favSongList.map(item => {
        return (
          <li key={item.id} className={styles['song-list-item']}>
            <div className={styles['item-img']} />
            <div className={styles['item-name']}>{item.name}</div>
          </li>
        )
      })}
    </ul>
  )
}

export default FavSongList
