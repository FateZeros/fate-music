import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

interface IProps {
  iconName: string
  title: string
  rightArrow?: boolean
  onRowClick?: () => void
}

const UserInfoRow: React.FC<IProps> = ({
  iconName,
  title,
  rightArrow = false,
  onRowClick
}) => {
  return (
    <div className={styles['user-info-row']} onClick={onRowClick}>
      <div className={cn(styles['info-img'], styles[`img-${iconName}`])} />
      <div className={styles['info-title']}>{title}</div>
      {rightArrow && <div className={styles['info-right-arrow']} />}
    </div>
  )
}

export default UserInfoRow
