import React from 'react'

import { formatPlayCount } from 'utils'
import styles from './index.module.scss'

interface IProps {
  count: number
}

const PlayCount: React.FC<IProps> = ({ count }) => {
  return <div className={styles['play-count']}>{formatPlayCount(count)}</div>
}

export default PlayCount
