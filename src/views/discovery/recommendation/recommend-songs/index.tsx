import React from 'react'
import dayjs from 'dayjs'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import LinkTitle from 'components/link-title'
import RecommendSongItem from 'components/recommend-song-item'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

const { useEffect } = React

/**
 * 发现 - 推荐歌单
 */
const RecommendSongs = () => {
  const [state, getRecommendResource] = useAsyncRequest(
    recommendApis.getRecommendResource
  )
  const { value: recommendSongs = [], loading: getRecommendLoading } = state
  console.log(recommendSongs, getRecommendLoading)

  useEffect(() => {
    getRecommendResource()
  }, [])

  const currentDay = dayjs().format('DD')

  return (
    <div className={styles['songs-wrap']}>
      <LinkTitle title="推荐歌单" route={ROUTES.DISCOVERY_SONGLIST} />
      <div className={styles['recommend-songs']}>
        <div className={styles['daily-recommend-songs']}>
          <div className={styles['daily-date']}>
            <div className={styles['daily-day']}>{currentDay}</div>
            <div className={styles['daily-play-icon']} />
          </div>
          <div className={styles['daily-tip']}>每日歌曲推荐</div>
        </div>
        {recommendSongs.map((item, index) => {
          return (
            index < 9 && <RecommendSongItem key={item.id} songItem={item} />
          )
        })}
      </div>
    </div>
  )
}

export default RecommendSongs
