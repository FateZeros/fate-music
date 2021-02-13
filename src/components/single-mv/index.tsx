import React from 'react'
import { useHistory } from 'react-router-dom'

import { IMv } from 'interfaces/common'
import ROUTES from 'constants/routes'
import PlayCount from 'components/play-count'

import styles from './index.module.scss'

interface IMvItem extends IMv {
  cover?: string
  type?: string
  copywriter?: string
  picUrl?: string
}

interface IProps {
  mvItem: IMvItem
  /* 一行显示的 item 个数*/
  rowItem: number
  showPlayIcon?: boolean
}
/**
 * MV - item
 */
const SingleMV: React.FC<IProps> = ({
  mvItem,
  rowItem,
  showPlayIcon = false
}) => {
  const history = useHistory()

  const handleGoMvDetail = () => {
    history.push({
      pathname: ROUTES.MV_DETAIL,
      search: `id=${mvItem.id}`
    })
  }

  return (
    <div className={styles[`item-wd${rowItem}`]} onClick={handleGoMvDetail}>
      <div className={styles['mv-img']}>
        <img src={mvItem.picUrl || mvItem.cover} loading="lazy" alt="" />
        {showPlayIcon && <div className={styles['mv-play-icon']} />}
      </div>
      <div className={styles['mv-name']}>{mvItem.name}</div>
      <div className={styles['mv-artist-name']}>{mvItem.artistName}</div>
      <PlayCount count={mvItem.playCount} />
      {mvItem.copywriter && (
        <div className={styles['mv-top-tips']}>{mvItem.copywriter}</div>
      )}
    </div>
  )
}

export default SingleMV
