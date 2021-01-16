import React from 'react'
import cn from 'classnames'

import { noop } from 'utils'
import styles from './index.module.scss'

interface IProps {
  title: string
  pic: string
  className?: string
  onClick?: () => void
}

const BannerItem: React.FC<IProps> = ({
  title,
  pic,
  className,
  onClick = noop
}) => {
  return (
    <div className={cn(className, styles['banner-item'])} onClick={onClick}>
      <img src={pic} loading="lazy" alt="" />
      <div className={styles['banner-title']}>{title}</div>
    </div>
  )
}

export default BannerItem
