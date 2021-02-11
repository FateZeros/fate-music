import React, { Fragment } from 'react'
import cn from 'classnames'

import PlayAllButton from 'components/play-all-button'
import CommonButtonNum from 'components/common-button-num'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

interface IProps {
  visible: boolean
  title: string
  from: string
  songs?: any
}
/*
 * 缩略 title
 * 当距离顶部达到一定的值后显示
 */
const BriefInfoTitle: React.FC<IProps> = ({ visible, title, from, songs }) => {
  return (
    <div
      className={cn(
        styles['daily-brief-title'],
        visible && styles['wrap-show']
      )}
    >
      <div className={styles['brief-title']}>{title}</div>
      <div className={styles['brief-row']}>
        {
          {
            [ROUTES.DAILY_SONGS]: (
              <Fragment>
                <PlayAllButton songs={songs} briefIcon={true} />
                <CommonButtonNum
                  name="collect-songs"
                  word="收藏全部"
                  briefIcon={true}
                />
              </Fragment>
            )
          }[from]
        }
      </div>
    </div>
  )
}

export default BriefInfoTitle
