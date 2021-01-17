import React from 'react'

import LinkTitle from 'components/link-title'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

/**
 * 发现 - 最新音乐
 */
const LatestSongs = () => {
  return (
    <div className={styles.wrap}>
      <LinkTitle title="最新音乐" route={ROUTES.DISCOVERY_LATEST_SONGS} />
    </div>
  )
}

export default LatestSongs
