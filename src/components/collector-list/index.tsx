import React from 'react'

import EmptyList from 'components/empty-list'

import styles from './index.module.scss'

/**
 * 收藏者列表
 */
const CollectorList = () => {
  return (
    <div className={styles['collector-wrap']}>
      <EmptyList word="暂无收藏者" showLink={false} />
    </div>
  )
}

export default CollectorList
