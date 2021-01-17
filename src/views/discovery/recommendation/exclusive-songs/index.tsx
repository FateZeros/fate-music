import React from 'react'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import LinkTitle from 'components/link-title'
import ExclusiveSongItem from 'components/exclusive-song-item'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

const { useEffect } = React

/**
 * 发现 - 独家放送
 */
const ExclusiveSongs = () => {
  const [state, getPrivatecontentEnter] = useAsyncRequest(
    recommendApis.getPrivatecontentEnter
  )
  const { value: privatecontent = [] } = state
  console.log(privatecontent)

  useEffect(() => {
    getPrivatecontentEnter()
  }, [])

  return (
    <div className={styles['songs-wrap']}>
      <LinkTitle title="独家放送" route={ROUTES.DISCOVERY_SONGLIST} />
      <div className={styles['songs-cont']}>
        {privatecontent.map(item => {
          return <ExclusiveSongItem key={item.id} songItem={item} />
        })}
      </div>
    </div>
  )
}

export default ExclusiveSongs
