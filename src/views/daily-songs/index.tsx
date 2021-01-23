import React from 'react'
import dayjs from 'dayjs'

import PlayAllButton from 'components/play-all-button'
import CollectButton from 'components/collect-button'
import TableSingleSong from 'components/table-single-song'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

const DailySongs = () => {
  const currentDay = dayjs().format('DD')
  return (
    <div className={styles.wrap}>
      <div className={styles['wrap-title']}>
        <div className={styles['wrap-title-img']}>{currentDay}</div>
        <div className={styles['wrap-title-info']}>
          <div className={styles['info-title']}>每日歌曲推荐</div>
          <div className={styles['info-tips']}>
            根据你的音乐口味生成，每天6:00更新
          </div>
        </div>
      </div>
      <div className={styles['wrap-row']}>
        <PlayAllButton />
        <CollectButton />
      </div>
      <TableSingleSong from={ROUTES.DAILY_SONGS} />
    </div>
  )
}

export default DailySongs
