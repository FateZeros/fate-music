import React from 'react'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import LinkTitle from 'components/link-title'
import RecommendSongItem from 'components/recommend-song-item'
import ROUTES from 'constants/routes'
import { getUserInfo } from 'utils/auth'

import styles from './index.module.scss'

const { useEffect } = React

/**
 * 发现 - 推荐歌单
 */
const RecommendSongs = () => {
  const history = useHistory()

  const [state, getRecommendResource] = useAsyncRequest(
    recommendApis.getRecommendResource
  )
  const { value: recommendSongs = [] } = state

  const userInfo: any = getUserInfo() || {}

  useEffect(
    () => {
      if (userInfo.token) {
        getRecommendResource()
      }
    },
    [getRecommendResource, userInfo.token]
  )

  const currentDay = dayjs().format('DD')

  return (
    <div className={styles['songs-wrap']}>
      <LinkTitle title="推荐歌单" route={ROUTES.DISCOVERY_SONGLIST} />
      <div className={styles['recommend-songs']}>
        <div className={styles['daily-recommend-songs']}>
          <div
            className={styles['daily-date']}
            onClick={() => history.push(ROUTES.DAILY_SONGS)}
          >
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
