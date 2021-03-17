import React from 'react'

import * as fmApis from 'apis/fm'
import useAsyncRequest from 'hooks/useAsyncRequest'

import SongLyric from 'components/song-lyric'

import styles from './index.module.scss'

const { useEffect } = React

/**
 * 私人 FM
 */
const FM = () => {
  const [personalFMState, getPersonalFM] = useAsyncRequest(fmApis.getPersonalFM)
  const { value: personalFMValue = [] } = personalFMState
  console.log(personalFMValue)
  const currentFM = personalFMValue[0] || {}
  console.log(currentFM, '=== 当前 FM1 ===')

  useEffect(
    () => {
      getPersonalFM()
    },
    [getPersonalFM]
  )

  return (
    <div className={styles['fm-wrap']}>
      <div className={styles['fm-infos']}>
        <div className={styles['fm-info-img']}>
          <img src={currentFM.album && currentFM.album.picUrl} alt="" />
          <div className={styles['fm-img-play']} />
        </div>
      </div>
      <SongLyric from="fm" />
    </div>
  )
}

export default FM
