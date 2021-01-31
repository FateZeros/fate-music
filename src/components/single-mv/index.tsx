import React from 'react'

import { IPersonalizedMVsResponse } from 'interfaces/recommendation'
import PlayCount from 'components/play-count'

import styles from './index.module.scss'

interface IProps {
  mvItem: IPersonalizedMVsResponse
  /* 一行显示的 item 个数*/
  rowItem: number
}
/**
 * MV - item
 */
const SingleMV: React.FC<IProps> = ({ mvItem, rowItem }) => {
  return (
    <div className={styles[`item-wd${rowItem}`]}>
      <div className={styles['mv-img']}>
        <img src={mvItem.picUrl} loading="lazy" alt="" />
      </div>
      <div className={styles['mv-name']}>{mvItem.name}</div>
      <div className={styles['mv-artist-name']}>{mvItem.artistName}</div>
      <PlayCount count={mvItem.playCount} />
      <div className={styles['mv-top-tips']}>{mvItem.copywriter}</div>
    </div>
  )
}

export default SingleMV
