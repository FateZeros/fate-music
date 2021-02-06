import React from 'react'

import styles from './index.module.scss'

interface IProps {
  name: string
  word: string
  showLeftLine?: boolean
}

/**
 * 通用按钮：图标 + 文字
 */
const CommonButton: React.FC<IProps> = ({
  name,
  word,
  showLeftLine = false
}) => {
  return (
    <div className={styles[`common-btn-${name}`]}>
      {showLeftLine && <div className={styles['btn-left-line']} />}
      {word}
    </div>
  )
}

export default CommonButton
