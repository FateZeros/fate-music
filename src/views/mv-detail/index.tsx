import React from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'qs'

import LinkTitle from 'components/link-title'
// import ROUTES from 'constants/routes'
import VideoPlayer from 'components/mv-player'
import * as vedioApis from 'apis/video'
import useAsyncRequest from 'hooks/useAsyncRequest'

import styles from './index.module.scss'

const { useEffect } = React
/**
 * MV 详情
 * [参考](https://segmentfault.com/a/1190000009395289)
 */
const MvDetail = () => {
  const { search } = useLocation()
  const { id } = qs.parse(search.substr(1))

  const [mvState, getMvDetail] = useAsyncRequest(vedioApis.getMvDetail)
  const { value: mvValue } = mvState
  const [mvUrlState, getMvUrl] = useAsyncRequest(vedioApis.getMvUrl)
  const { value: mvUrlValue } = mvUrlState

  console.log(mvValue, mvUrlValue, 11)

  useEffect(
    () => {
      if (id) {
        getMvDetail({
          mvid: id
        })
        getMvUrl({
          id
        })
      }
    },
    [id, getMvDetail, getMvUrl]
  )

  return (
    <div className={styles['mv-detail']}>
      <div className={styles['detail-content']}>
        <LinkTitle title="MV详情" />
        <VideoPlayer
          url={mvUrlValue && mvUrlValue.url}
          poster={mvValue && mvValue.cover}
        />
      </div>
      <div className={styles['recomment-mv']}>相关推荐</div>
    </div>
  )
}

export default MvDetail
