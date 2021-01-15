import React from 'react'

import { noop } from 'utils'
import styles from './index.module.scss'

interface IProps {
  title: string
  imgUrl: string
  onClick?: () => void
}

const BannerItem: React.FC<IProps> = ({ title, imgUrl, onClick = noop }) => {
  return (
    <div className={styles['banner-item']} onClick={onClick}>
      <img src={imgUrl} loading="lazy" alt="" />
      <div className={styles['banner-title']}>{title}</div>
    </div>
  )
}

export default BannerItem
