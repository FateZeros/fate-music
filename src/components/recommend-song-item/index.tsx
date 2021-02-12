import React from 'react'
import { useHistory } from 'react-router-dom'

import { IRecommendResponse } from 'interfaces/recommendation'
import PlayCount from 'components/play-count'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

interface IProps {
  songItem: IRecommendResponse
}

/*
 * 个性推荐 - 推荐歌曲 - item
 */
const RecommendSongItem: React.FC<IProps> = ({ songItem }) => {
  const history = useHistory()

  const { picUrl, copywriter, playcount } = songItem

  const handleGoSongsDetail = id => {
    history.push({
      pathname: ROUTES.SONGS_DETAIL,
      search: `id=${id}`
    })
  }

  return (
    <div
      className={styles['song-item']}
      onClick={() => handleGoSongsDetail(songItem.id)}
    >
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
