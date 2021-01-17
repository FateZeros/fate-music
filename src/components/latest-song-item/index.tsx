import React from 'react'
import { IPersonalizedNewsongs } from 'apis/types/recommendation'
import styles from './index.module.scss'

interface IProps {
  songItem: IPersonalizedNewsongs
}

const LatestSongItem: React.FC<IProps> = ({ songItem }) => {
  const { name, picUrl, song = [] } = songItem

  return (
    <div className={styles.wrap}>
      <div className={styles['wrap-img']}>
        <img src={picUrl} loading="lazy" alt="" />
      </div>
      <div>{name}</div>
      <div />
    </div>
  )
}

export default LatestSongItem
