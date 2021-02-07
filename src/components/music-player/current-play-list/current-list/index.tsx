import React, { useContext } from 'react'

import TableSingleSong from 'components/table-single-song'
import CommonButton from 'components/common-button'
import { getMusicPlayerList } from 'utils/music-player'
import EmptyList from 'components/empty-list'
import { ReducerContext } from 'reducers'

import styles from './index.module.scss'

const CurrentList = () => {
  const [state, dispatch] = useContext(ReducerContext)
  const { currentPlayList } = state.musicPlayer

  /**
   * 优先以 reducer 中的数据为展示数据
   */
  let songs: any = []
  if (currentPlayList.length) {
    songs = currentPlayList
  } else {
    songs = getMusicPlayerList()
  }
  const hasSong: boolean = songs.length > 0

  const handleCollectAllSongs = () => {
    console.log(111)
  }

  const handleClearCurrentPlayList = () => {
    dispatch({
      type: 'SET_CURRENT_PLAYER_LIST',
      payload: {
        songs: []
      }
    })
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
