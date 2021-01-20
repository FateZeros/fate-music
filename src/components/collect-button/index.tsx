import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

const CollectButton = () => {
  const isDisable = false

  return (
    <div className={cn(styles.wrap, isDisable ? styles['disable-btn'] : '')}>
      收藏(0)
    </div>
  )
}

export default CollectButton
