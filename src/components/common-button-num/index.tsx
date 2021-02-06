import React from 'react'
import cn from 'classnames'

import { formatPlayCount } from 'utils/index'

import styles from './index.module.scss'

interface IProps {
  name: string
  word: string
  disable?: boolean
  num?: number
}

const CommonButtonNum: React.FC<IProps> = props => {
  const { name, word, disable = false, num } = props

  return (
    <div
      className={cn(
        styles[`btn-name-${name}`],
        disable && styles[`disable-btn-${name}`]
      )}
    >
      <div className={styles['btn-name']}>{word}</div>
      {num && <div className={styles['btn-num']}>({formatPlayCount(num)})</div>}
    </div>
  )
}

export default CommonButtonNum
