import React, { Fragment } from 'react'
import cn from 'classnames'

import ROUTES from 'constants/routes'
import { formatNum, formatSongTime } from 'utils'

import styles from './index.module.scss'

interface IProps {
  from: string
  songs?: any
}

/**
 * 歌曲列表
 * 1. 推荐 DAILY_SONGS
 * 2. 我喜欢的音乐
 * ...
 */
const TableSingleSong: React.FC<IProps> = ({ from, songs }) => {
  // 展示通用 Header
  const commonFrom = [ROUTES.DAILY_SONGS, ROUTES.ITUNES]
  const showCommon = commonFrom.includes(from)

  return (
    <Fragment>
      {showCommon && (
        <div className={styles['wrap-table-title']}>
          <div className={styles['item-sort']} />
          <div className={styles['item-title']}>音乐标题</div>
          <div className={styles['item-col']}>歌手</div>
          <div className={styles['item-col']}>专辑</div>
          <div className={styles['item-time']}>时长</div>
          {from === ROUTES.ITUNES && (
            <div className={styles['item-size']}>大小</div>
          )}
        </div>
      )}
      {songs.map((itemSong, index) => {
        return (
          <div
            className={cn(
              index % 2 === 0 && styles['table-even-row'],
              styles['wrap-table-song']
            )}
            key={itemSong.id}
          >
            {showCommon && (
              <div className={styles['item-sort']}>
                <div className={styles['song-num']}>{formatNum(index + 1)}</div>
                <div className={styles['song-collect']} />
                <div className={styles['song-download']} />
              </div>
            )}
            <div className={styles['item-title']}>{itemSong.name}</div>
            <div className={styles['item-col']}>{itemSong.arName}</div>
            <div className={styles['item-col']}>{itemSong.al.name}</div>
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
