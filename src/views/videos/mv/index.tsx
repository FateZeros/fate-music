import React from 'react'

import * as videoApis from 'apis/video'
import useAsyncRequest from 'hooks/useAsyncRequest'
import LinkTitle from 'components/link-title'
import ROUTES from 'constants/routes'
import SingleMV from 'components/single-mv'

import styles from './index.module.scss'

const { useEffect } = React
/**
 * 视频 - MV
 */
const VideoMV = () => {
  // 最新 MV
  const [state, getMvFirst] = useAsyncRequest(videoApis.getMvFirst)
  const { value: mvFirstList = [] } = state

  // 网易出品
  const [rcmdState, getExclusiveRcmd] = useAsyncRequest(
    videoApis.getExclusiveRcmd
  )
  const { value: rcmdMvList = [] } = rcmdState

  useEffect(
    () => {
      getMvFirst({
        limit: 6
      })
      getExclusiveRcmd({
        limit: 6
      })
    },
    [getMvFirst, getExclusiveRcmd]
  )

  return (
    <div className={styles.wrap}>
      <div className={styles['latest-mv-title']}>
        <LinkTitle title="最新MV" route={ROUTES.ALL_MVS} />
      </div>
      <div className={styles['mv-list']}>
        {mvFirstList.map(item => {
          return (
            <SingleMV
              key={item.id}
              rowItem={3}
              mvItem={item}
              showPlayIcon={true}
            />
          )
        })}
      </div>
      <LinkTitle title="网易出品" route={ROUTES.ALL_MVS} />
      <div className={styles['mv-list']}>
        {rcmdMvList.map(item => {
          return (
            <SingleMV
              key={item.id}
              rowItem={3}
              mvItem={item}
              showPlayIcon={true}
            />
          )
        })}
      </div>
    </div>
  )
}

export default VideoMV
