import React from 'react'
import cn from 'classnames'
import dayjs from 'dayjs'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import PlayAllButton from 'components/play-all-button'
import CommonButtonNum from 'components/common-button-num'
import TableSingleSong from 'components/table-single-song'
import ROUTES from 'constants/routes'
import BriefInfoTitle from 'components/brief-info-title'

import styles from './index.module.scss'

const { useEffect, useRef, useState } = React

const DailySongs = () => {
  const currentDay = dayjs().format('DD')
  /**
   * 当 dailyBtnRow 距离顶部的距离 < 50 的显示缩略顶部信息
   */
  const dailyBtnRowRef = useRef<HTMLDivElement | null>(null)
  const [showDailyBrief, setDailyBrief] = useState(false)

  const [state, getRecommendSongs] = useAsyncRequest(
    recommendApis.getRecommendSongs
  )
  const { value: recommendSongs = [] } = state

  useEffect(
    () => {
      getRecommendSongs()
    },
    [getRecommendSongs]
  )

  useEffect(
    () => {
      const documentEle = document.getElementById('music-content')
      const dailyBtnRowEle = dailyBtnRowRef.current
      if (documentEle && dailyBtnRowEle) {
        documentEle.addEventListener(
          'scroll',
          () => {
            const dailyBtnRowTop = dailyBtnRowEle.getBoundingClientRect().top
            if (dailyBtnRowTop > 50) {
              setDailyBrief(false)
            } else {
              setDailyBrief(true)
            }
          },
          false
        )
      }
    },
    [dailyBtnRowRef]
  )

  let songs: any[] = []
  recommendSongs.forEach(item => {
    const songItem = {
      arName: ''
    }
    if (Array.isArray(item.ar)) {
      let arNames: string[] = []
      item.ar.forEach(itemAr => {
        arNames.push(itemAr.name)
      })
      songItem.arName = arNames.join('/')
    }
    songs.push({
      ...item,
      ...songItem
    })
  })

  return (
    <div className={styles.wrap}>
      <div
        className={cn(
          styles['wrap-title-content'],
          showDailyBrief && styles['wrap-hide']
        )}
      >
        <div className={styles['wrap-title']}>
          <div className={styles['wrap-title-img']}>{currentDay}</div>
          <div className={styles['wrap-title-info']}>
            <div className={styles['info-title']}>每日歌曲推荐</div>
            <div className={styles['info-tips']}>
              根据你的音乐口味生成，每天6:00更新
            </div>
          </div>
        </div>
        <div
          className={styles['wrap-row']}
          ref={ref => (dailyBtnRowRef.current = ref)}
        >
          <PlayAllButton songs={songs} />
          <CommonButtonNum name="collect-songs" word="收藏全部" />
        </div>
      </div>
      <BriefInfoTitle
        visible={showDailyBrief}
        title="每日歌曲推荐"
        from={ROUTES.DAILY_SONGS}
        songs={songs}
      />
      <TableSingleSong from={ROUTES.DAILY_SONGS} songs={songs} />
    </div>
  )
}

export default DailySongs
