import React from 'react'

import TableSingleSong from 'components/table-single-song'
import CommonButton from 'components/common-button'
import { getMusicPlayerList, removeMusicPlayerList } from 'utils/music-player'
import EmptyList from 'components/empty-list'

import styles from './index.module.scss'

const CurrentList = () => {
  const songs: any = getMusicPlayerList()
  const hasSong: boolean = songs.length > 0

  const handleCollectAllSongs = () => {
    console.log(111)
  }

  const handleClearCurrentPlayList = () => {
    removeMusicPlayerList()
  }

  return (
    <div className={styles['wrap']}>
      <div className={styles['current-title']}>
        <div className={styles['song-num']}>共{songs.length}首</div>
        <div className={styles['song-action']}>
          <CommonButton
            name="collect-songs"
            word="收藏全部"
            btnClickFunc={handleCollectAllSongs}
            disable={!hasSong}
          />
          <CommonButton
            name="delete-songs"
            word="清空"
            showLeftLine={true}
            btnClickFunc={handleClearCurrentPlayList}
            disable={!hasSong}
          />
        </div>
      </div>
      <div className={styles['current-songs']}>
        {hasSong ? (
          <TableSingleSong from="current_play_list" songs={songs} />
        ) : (
          <EmptyList word="您还没有添加任何歌曲" />
        )}
      </div>
    </div>
  )
}

export default CurrentList
