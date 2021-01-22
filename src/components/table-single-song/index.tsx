import React, { Fragment } from 'react'
import cn from 'classnames'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import ROUTES from 'constants/routes'
import { IRecommendSongsResponse } from 'interfaces/recommendation'
import { formatNum, formatSongTime } from 'utils'

import styles from './index.module.scss'

interface IProps {
  from: string
}

const { useEffect } = React

/**
 * 歌曲列表
 * 1. 推荐 DAILY_SONGS
 * 2. 我喜欢的音乐
 * ...
 */
const TableSingleSong: React.FC<IProps> = props => {
  const [state, getRecommendSongs] = useAsyncRequest(
    recommendApis.getRecommendSongs
  )
  const { value: recommendSongs = [] } = state

  useEffect(
    () => {
      const getTableSongList = () => {
        switch (props.from) {
          case ROUTES.DAILY_SONGS: {
            getRecommendSongs()
            break
          }
          default:
            break
        }
      }
      getTableSongList()
    },
    [props, getRecommendSongs]
  )

  let songs: IRecommendSongsResponse[] = []
  switch (props.from) {
    case ROUTES.DAILY_SONGS:
      songs = recommendSongs
      break
  }

  return (
    <Fragment>
      <div className={styles['wrap-table-title']}>
        <div className={styles['item-sort']} />
        <div className={styles['item-title']}>音乐标题</div>
        <div className={styles['item-col']}>歌手</div>
        <div className={styles['item-col']}>专辑</div>
        <div className={styles['item-time']}>时长</div>
      </div>
      {songs.map((itemSong, index) => {
        return (
          <div
            className={cn(
              index % 2 === 0 && styles['table-even-row'],
              styles['wrap-table-song']
            )}
            key={itemSong.id}
          >
            <div className={styles['item-sort']}>{formatNum(index + 1)}</div>
            <div className={styles['item-title']}>{itemSong.name}</div>
            <div className={styles['item-col']}>歌手</div>
            <div className={styles['item-col']}>专辑</div>
            <div className={styles['item-time']}>
              {formatSongTime(itemSong.dt)}
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}

export default TableSingleSong
