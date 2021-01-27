import React from 'react'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import RecommendSongItem from 'components/recommend-song-item'
import { getUserInfo } from 'utils/auth'

import styles from './index.module.scss'

const { useEffect } = React
/**
 * 发现 - 歌单
 */
const SongList = () => {
  const userInfo: any = getUserInfo() || {}

  const [oneHighqualityState, getOneHighquality] = useAsyncRequest(
    recommendApis.getOneHighquality
  )
  const { value: highquality = {} } = oneHighqualityState

  const [state, getRecommendResource] = useAsyncRequest(
    recommendApis.getRecommendResource
  )
  const { value: recommendSongs = [] } = state

  useEffect(
    () => {
      getOneHighquality()
      if (userInfo.token) {
        getRecommendResource()
      }
    },
    [getOneHighquality, getRecommendResource, userInfo.token]
  )

  return (
    <div className={styles['song-list-wrap']}>
      <div className={styles['highquality-song-wrap']}>
        <div className={styles['highquality-song-row']}>
          {highquality.coverImgUrl && (
            <img src={highquality.coverImgUrl} loading="lazy" alt="" />
          )}
          <div className={styles['highquality-song-info']}>
            <div className={styles['highquality-tag']}>精品歌单</div>
            <div className={styles['highquality-name']}>{highquality.name}</div>
            <div className={styles['highquality-tip']}>
              {highquality.copywriter}
            </div>
          </div>
        </div>
      </div>
      <div className={styles['song-cont']}>
        {recommendSongs.map(item => {
          return <RecommendSongItem key={item.id} songItem={item} />
        })}
      </div>
    </div>
  )
}

export default SongList
