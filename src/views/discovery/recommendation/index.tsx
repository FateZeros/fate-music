import React from 'react'

import Banner from './banner'
import RecommendSongs from './recommend-songs'
import ExclusiveSongs from './exclusive-songs'
import styles from './index.module.scss'

const Recommendation = () => {
  return (
    <div className={styles['recommend-wrap']}>
      <Banner />
      <RecommendSongs />
      <ExclusiveSongs />
    </div>
  )
}

export default Recommendation
