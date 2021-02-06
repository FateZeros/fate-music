import React from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

interface IProps {
  name: string
  word: string
  btnClickFunc: () => void
  showLeftLine?: boolean
  disable?: boolean
}

/**
 * 通用按钮：图标 + 文字
 */
const CommonButton: React.FC<IProps> = ({
  name,
  word,
  btnClickFunc,
  showLeftLine = false,
  disable = false
}) => {
  return (
    <div
      className={cn(
        styles[`common-btn-${name}`],
        disable && styles[`disable-btn-${name}`]
      )}
      onClick={btnClickFunc}
    >
      {showLeftLine && <div className={styles['btn-left-line']} />}
      {word}
    </div>
  )
}

export default CommonButton
