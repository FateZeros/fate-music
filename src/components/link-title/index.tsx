import React from 'react'
import { useHistory } from 'react-router-dom'

import styles from './index.module.scss'

interface IProps {
  title: string
  route?: string
}

const LinkTitle: React.FC<IProps> = ({ title, route = '' }) => {
  const history = useHistory()

  const handleRouteDirection = () => {
    if (route) {
      history.push(route)
    } else {
      history.goBack()
    }
  }

  return (
    <div className={styles['link-title-row']}>
      <div className={styles['link-title']} onClick={handleRouteDirection}>
        {!route && <div className={styles['title-back-arrow']} />}
        <div className={styles['title']}>{title}</div>
        {route && <div className={styles['title-arrow']} />}
      </div>
    </div>
  )
}

export default LinkTitle
