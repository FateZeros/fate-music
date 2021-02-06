import React from 'react'

import TableSingleSong from 'components/table-single-song'
import CommonButton from 'components/common-button'
import { getMusicPlayerList } from 'utils/music-player'

import styles from './index.module.scss'

const CurrentList = () => {
  const songs: any = getMusicPlayerList()

  return (
    <div className={styles['wrap']}>
      <div className={styles['current-title']}>
        <div className={styles['song-num']}>共{songs.length}首</div>
        <div className={styles['song-action']}>
          <CommonButton name="collect-songs" word="收藏全部" />
          <CommonButton name="delete-songs" word="清空" showLeftLine={true} />
        </div>
      </div>
      <div className={styles['current-songs']}>
        <TableSingleSong from="current_play_list" songs={songs} />
      </div>
    </div>
  )
}

export default CurrentList
