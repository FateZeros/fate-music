import React, { Fragment } from 'react'
import cn from 'classnames'

import { formatPlayCount } from 'utils/index'

import styles from './index.module.scss'

interface IProps {
  name: string
  word?: string
  disable?: boolean
  num?: number
  briefIcon?: boolean
}

const CommonButtonNum: React.FC<IProps> = props => {
  const { name, word, disable = false, num, briefIcon = false } = props

  let hasNum = false
  if (num || num === 0) {
    hasNum = true
  }

  return (
    <Fragment>
      {briefIcon ? (
        <div className={styles[`brief-wrap-${name}`]} />
      ) : (
        <div
          className={cn(
            styles[`btn-name-${name}`],
            disable && styles[`disable-btn-${name}`]
          )}
        >
          <div className={styles['btn-name']}>{word}</div>
          {hasNum ? (
            <div className={styles['btn-num']}>({formatPlayCount(num)})</div>
          ) : null}
        </div>
      )}
    </Fragment>
  )
}

export default CommonButtonNum
