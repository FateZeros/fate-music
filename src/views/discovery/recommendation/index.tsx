import React from 'react'

import Banner from './banner'
import RecommendSongs from './recommend-songs'
import ExclusiveSongs from './exclusive-songs'
import LatestSongs from './latest-songs'
import RecommendMVs from './recommend-mvs'

import styles from './index.module.scss'

const Recommendation = () => {
  return (
    <div className={styles['recommend-wrap']}>
      <Banner />
      <RecommendSongs />
      <ExclusiveSongs />
      <LatestSongs />
      <RecommendMVs />
    </div>
  )
}

export default Recommendation
