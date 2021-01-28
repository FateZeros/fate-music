import React from 'react'

import TableSingleSong from 'components/table-single-song'
import EmptyList from 'components/empty-list'
import { getMusicHistoryList } from 'utils/music-player'

import styles from './index.module.scss'

const HistoryList = () => {
  const songs = getMusicHistoryList()
  console.log(songs, 'hist')

  return (
    <div className={styles['wrap']}>
      <div className={styles['current-title']}>
        <div className={styles['song-num']}>共{0}首</div>
      </div>
      <div className={styles['current-songs']}>
        {songs ? (
          <TableSingleSong from="current_play_list" songs={songs} />
        ) : (
          <EmptyList word="你还没有播放任何歌曲!" />
        )}
      </div>
    </div>
  )
}

export default HistoryList
