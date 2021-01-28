import React from 'react'

import PlayAllButton from 'components/play-all-button'
import TableSingleSong from 'components/table-single-song'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

/**
 * itunes 音乐
 */
const Itunes = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles['wrap-row']}>
        <PlayAllButton songs={[]} />
      </div>
      <TableSingleSong from={ROUTES.ITUNES} />
    </div>
  )
}

export default Itunes
