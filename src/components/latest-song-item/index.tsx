import React from 'react'
import { IPersonalizedNewsongs } from 'apis/types/recommendation'
import styles from './index.module.scss'

interface IProps {
  songItem: IPersonalizedNewsongs
  sortNum: number
}

const LatestSongItem: React.FC<IProps> = ({ songItem, sortNum }) => {
  const { name, picUrl, song } = songItem

  let songArtistName: string = ''
  song.artists.forEach(i => {
    songArtistName += `${i.name}/`
  })
  songArtistName = songArtistName.substr(0, songArtistName.length - 1)

  return (
    <div className={styles.wrap}>
      <div className={styles['wrap-img']}>
        <img src={picUrl} loading="lazy" alt="" />
        <div className={styles['play-icon']} />
      </div>
      <div className={styles['wrap-item-num']}> {sortNum}</div>
      <div className={styles['wrap-item-info']}>
        <div className={styles['item-name']}>{name}</div>
        <div className={styles['item-artist-name']}>{songArtistName}</div>
      </div>
    </div>
  )
}

export default LatestSongItem
