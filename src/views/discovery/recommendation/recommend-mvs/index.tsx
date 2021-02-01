import React from 'react'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import LinkTitle from 'components/link-title'
import ROUTES from 'constants/routes'
import SingleMV from 'components/single-mv'

import styles from './index.module.scss'

const { useEffect } = React
/**
 * 发现 - 推荐MV
 */
const RecommendMVs = () => {
  const [state, getPersonalizedMVs] = useAsyncRequest(
    recommendApis.getPersonalizedMVs
  )
  const { value: recommendMVs = [] } = state

  useEffect(
    () => {
      getPersonalizedMVs()
    },
    [getPersonalizedMVs]
  )

  return (
    <div className={styles.wrap}>
      <LinkTitle title="推荐MV" route={ROUTES.VIDEOS_MV} />
      <div className={styles['recomment-mvs']}>
        {recommendMVs.map(item => {
          return <SingleMV key={item.id} rowItem={4} mvItem={item} />
        })}
      </div>
    </div>
  )
}

export default RecommendMVs
