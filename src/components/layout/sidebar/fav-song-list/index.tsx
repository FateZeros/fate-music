import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import cn from 'classnames'
import qs from 'qs'

import ROUTES from 'constants/routes'
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
  const history = useHistory()
  const { search } = useLocation()
  const { id } = qs.parse(search.substr(1))

  const favSongList: IUserPlayListResponse[] = []
  songList.forEach(item => {
    if (item.creator.userId !== userId) {
      favSongList.push(item)
    }
  })

  const handleSongClick = songId => {
    if (songId !== +id) {
      history.push({
        pathname: ROUTES.SONGS_DETAIL,
        search: `id=${songId}&type=4`
      })
    }
  }

  return (
    <ul className={cn(visible && styles['song-show'], styles['fav-song-list'])}>
      {favSongList.map(item => {
        return (
          <li
            key={item.id}
            className={styles['song-list-item']}
            onClick={() => handleSongClick(item.id)}
          >
            <div className={styles['item-img']} />
            <div
              className={cn(
                styles['item-name'],
                item.id === +id && styles['item-name-active']
              )}
            >
              {item.name}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default FavSongList
