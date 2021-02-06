import React from 'react'

import TableSingleSong from 'components/table-single-song'
import EmptyList from 'components/empty-list'
import CommonButton from 'components/common-button'
import { getMusicHistoryList } from 'utils/music-player'

import styles from './index.module.scss'

const HistoryList = () => {
  const songs: any = getMusicHistoryList()
  const hasHistorySong: boolean = songs.length > 0

  const handleClearHistoryPlayList = () => {
    console.log(1212)
  }

  return (
    <div className={styles['wrap']}>
      <div className={styles['current-title']}>
        <div className={styles['song-num']}>共{songs.length}首</div>
        <div className={styles['song-action']}>
          <CommonButton
            name="delete-songs"
            word="清空"
            btnClickFunc={handleClearHistoryPlayList}
            disable={!hasHistorySong}
          />
        </div>
      </div>
      <div className={styles['current-songs']}>
        {hasHistorySong ? (
          <TableSingleSong from="current_play_list" songs={songs} />
        ) : (
          <EmptyList word="你还没有播放任何歌曲!" />
        )}
      </div>
    </div>
  )
}

export default HistoryList
