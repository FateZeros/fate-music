import React from 'react'
import { useHistory } from 'react-router-dom'

import styles from './index.module.scss'

interface IProps {
  title: string
  route: string
  backType?: boolean
}

const LinkTitle: React.FC<IProps> = ({ title, route, backType = false }) => {
  const history = useHistory()

  const handleRouteDirection = () => {
    history.push(route)
  }

  return (
    <div className={styles['link-title-row']}>
      <div className={styles['link-title']} onClick={handleRouteDirection}>
        {backType && <div className={styles['title-back-arrow']} />}
        <div className={styles['title']}>{title}</div>
        {!backType && <div className={styles['title-arrow']} />}
      </div>
    </div>
  )
}

export default LinkTitle
