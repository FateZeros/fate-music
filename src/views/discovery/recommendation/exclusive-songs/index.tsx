import React from 'react'

import LinkTitle from 'components/link-title'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

/**
 * 发现 - 独家放送
 */
const ExclusiveSongs = () => {
  return (
    <div className={styles['songs-wrap']}>
      <LinkTitle title="独家放送" route={ROUTES.DISCOVERY_SONGLIST} />
    </div>
  )
}

export default ExclusiveSongs
