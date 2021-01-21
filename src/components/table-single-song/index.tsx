import React, { Fragment } from 'react'

import ROUTES from 'constants/routes'

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
  useEffect(
    () => {
      const getTableSongList = () => {
        console.log(props, '===')
        switch (props.from) {
          case ROUTES.DAILY_SONGS:
            console.log(1)
            break
          default:
            break
        }
      }
      getTableSongList()
    },
    [props]
  )

  return (
    <Fragment>
      <div className={styles['wrap-table-title']}>
        <div className={styles['item-sort']} />
        <div className={styles['item-title']}>音乐标题</div>
        <div className={styles['item-col']}>歌手</div>
        <div className={styles['item-col']}>专辑</div>
        <div className={styles['item-time']}>时长</div>
      </div>
    </Fragment>
  )
}

export default TableSingleSong
