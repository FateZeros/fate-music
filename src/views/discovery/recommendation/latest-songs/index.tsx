import React from 'react'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import LinkTitle from 'components/link-title'
import LatestSongitem from 'components/latest-song-item'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

const { useEffect } = React
/**
 * 发现 - 最新音乐
 */
const LatestSongs = () => {
  const [state, getPersonalizedNewsongs] = useAsyncRequest(
    recommendApis.getPersonalizedNewsongs
  )
  const { value: newSongs = [] } = state
  console.log(newSongs)

  useEffect(() => {
    getPersonalizedNewsongs()
  }, [])

  return (
    <div className={styles.wrap}>
      <LinkTitle title="最新音乐" route={ROUTES.DISCOVERY_LATEST_SONGS} />
      <div className={styles['latest-songs']}>
        {newSongs.map(item => {
          return <LatestSongitem key={item.id} songItem={item} />
        })}
      </div>
    </div>
  )
}

export default LatestSongs
