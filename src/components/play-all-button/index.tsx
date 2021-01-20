import React from 'react'

import styles from './index.module.scss'

/**
 * 播放全部按钮
 */
const PlayAllButton = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles['wrap-play']} />
      <div className={styles['wrap-word']}>播放全部</div>
      <div className={styles['wrap-add']} />
    </div>
  )
}

export default PlayAllButton
