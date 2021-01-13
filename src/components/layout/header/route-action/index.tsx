import React from 'react'
import { useHistory } from 'react-router-dom'

import styles from './index.module.scss'

/**
 * history 应该判断是否可以继续前进 & 后退
 */
const RouteAction = () => {
  const history = useHistory()

  const handleRouteBack = () => {
    history.goBack()
  }

  const handleRouteForward = () => {
    history.goForward()
  }

  return (
    <div className={styles['action-wrap']}>
      <div className={styles['action-arrows']}>
        <div
          className={styles['action-left']}
          onClick={() => handleRouteBack()}
        />
        <div
          className={styles['action-right']}
          onClick={() => handleRouteForward()}
        />
      </div>
    </div>
  )
}

export default RouteAction
