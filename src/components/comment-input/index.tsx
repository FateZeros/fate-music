import React from 'react'
import cn from 'classnames'

import EmptyList from 'components/empty-list'

import styles from './index.module.scss'

interface IProps {
  hasBorderTop?: boolean
}

const { useState } = React
/**
 * 评论输入框 & 评论列表
 */
const CommentInput: React.FC<IProps> = ({ hasBorderTop = true }) => {
  const [inputLimitNum, setInputLimitNum] = useState<number>(140)

  const handleCommentInputChange = e => {
    const inputValue = e.target.value
    setInputLimitNum(140 - inputValue.length)
  }

  return (
    <div
      className={cn(
        styles['comment-input'],
        hasBorderTop && styles['border-top']
      )}
    >
      <div className={styles['input-wrap']}>
        <div className={styles['input-content']}>
          <textarea
            placeholder="输入评论或者@朋友"
            maxLength={inputLimitNum}
            rows={3}
            onChange={e => handleCommentInputChange(e)}
          />
          <div className={styles['input-limit']}>{inputLimitNum}</div>
        </div>
        <div className={styles['input-other-row']}>
          <div className={styles['comment-submit-btn']}>提交</div>
        </div>
      </div>
      <div className={styles['list-wrap']}>
        <EmptyList word="还没有评论，快来抢沙发～" showLink={false} />
      </div>
    </div>
  )
}

export default CommentInput
