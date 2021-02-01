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
  const [state, getMvFirst] = useAsyncRequest(videoApis.getMvFirst)
  const { value: mvFirstList = [] } = state
  console.log(mvFirstList)

  useEffect(
    () => {
      getMvFirst({
        limit: 6
      })
    },
    [getMvFirst]
  )

  return (
    <div className={styles.wrap}>
      <div className={styles['latest-mv-title']}>
        <LinkTitle title="最新MV" route={ROUTES.ALL_MVS} />
      </div>
      <div className={styles['latest-mvs']}>
        {mvFirstList.map(item => {
          return <SingleMV key={item.id} rowItem={3} mvItem={item} />
        })}
      </div>
    </div>
  )
}

export default VideoMV
