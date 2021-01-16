import React from 'react'
import { useHistory } from 'react-router-dom'

import styles from './index.module.scss'

interface IProps {
  title: string
  route: string
}

const LinkTitle: React.FC<IProps> = ({ title, route }) => {
  const history = useHistory()

  return (
    <div className={styles['link-title-row']}>
      <div className={styles['link-title']} onClick={() => history.push(route)}>
        {title}
      </div>
    </div>
  )
}

export default LinkTitle
