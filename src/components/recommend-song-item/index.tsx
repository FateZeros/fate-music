import React from 'react'

import { IRecommendResponse } from 'apis/types/recommendation'
import PlayCount from 'components/play-count'
import styles from './index.module.scss'

interface IProps {
  songItem: IRecommendResponse
}

/*
 * 个性推荐 - 推荐歌曲 - item
 */
const RecommendSongItem: React.FC<IProps> = ({ songItem }) => {
  const { picUrl, copywriter, playcount } = songItem

  return (
    <div className={styles['song-item']}>
      <div className={styles['song-img']}>
        <img src={picUrl} loading="lazy" alt="" />
        <div className={styles['daily-play-icon']} />
      </div>
      <div className={styles['song-words']}>{copywriter}</div>
      <PlayCount count={playcount} />
    </div>
  )
}

export default RecommendSongItem
