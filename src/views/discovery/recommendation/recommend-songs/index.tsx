import React from 'react'
import { useHistory } from 'react-router-dom'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import LinkTitle from 'components/link-title'
import ROUTES from 'constants/routes'

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
  const { value: recommendSongs = [], loading: getRecommendLoading } = state
  console.log(recommendSongs, getRecommendLoading)

  useEffect(() => {
    getRecommendResource()
  }, [])

  return (
    <div className={styles['songs-wrap']}>
      <LinkTitle title="推荐歌单" route={ROUTES.DISCOVERY_SONGLIST} />
      <div className={styles['recommend-songs']}>
        <div className={styles['daliy-recommend-songs']}>17</div>
        {recommendSongs.map((item, index) => {
          return (
            index < 7 && (
              <div key={item.id} className={styles['song-item']}>
                <img src={item.picUrl} loading="lazy" alt="" />
              </div>
            )
          )
        })}
      </div>
    </div>
  )
}

export default RecommendSongs
