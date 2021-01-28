import React from 'react'

import TableSingleSong from 'components/table-single-song'
import { getMusicPlayerList } from 'utils/music-player'

import styles from './index.module.scss'

const CurrentList = () => {
  const songs = getMusicPlayerList()

  return (
    <div className={styles['wrap']}>
      <div className={styles['current-title']}>
        <div className={styles['song-num']}>共{0}首</div>
      </div>
      <div className={styles['current-songs']}>
        <TableSingleSong from="current_play_list" songs={songs} />
      </div>
    </div>
  )
}

export default CurrentList
