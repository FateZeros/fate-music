import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

/**
 * 收藏按钮
 */
const CollectButton = () => {
  const isDisable = false

  return (
    <div className={cn(styles.wrap, isDisable ? styles['disable-btn'] : '')}>
      收藏全部
    </div>
  )
}

export default CollectButton
