import React from 'react'

import { IPrivateContentRepose } from 'apis/types/recommendation'
import styles from './index.module.scss'

interface IProps {
  songItem: IPrivateContentRepose
}

/**
 * 发现 - 独家放送 - item
 */
const ExclusiveSongItem: React.FC<IProps> = ({ songItem }) => {
  const { picUrl, name } = songItem
  return (
    <div className={styles.wrap}>
      <div className={styles['wrap-img']}>
        <img src={picUrl} loading="lazy" alt="" />
      </div>
      <div className={styles['wrap-words']}>{name}</div>
    </div>
  )
}

export default ExclusiveSongItem
