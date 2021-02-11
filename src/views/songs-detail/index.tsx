import React from 'react'
import cn from 'classnames'
import { useLocation } from 'react-router-dom'
import qs from 'qs'
import dayjs from 'dayjs'

import * as Apis from 'apis/mysong-list'
import useAsyncRequest from 'hooks/useAsyncRequest'
import PlayAllButton from 'components/play-all-button'
import CommonButtonNum from 'components/common-button-num'
import TableSingleSong from 'components/table-single-song'
import ROUTES from 'constants/routes'
import BriefInfoTitle from 'components/brief-info-title'

import styles from './index.module.scss'

const { useEffect, useState, useRef } = React

enum TabType {
  LIST = 'list',
  COMMENT = 'comment',
  COLLECTORS = 'collectors'
}
/**
 * 歌单详情
 */
const SongsDetail = () => {
  // const history = useHistory()
  const { search } = useLocation()
  const { id, type } = qs.parse(search.substr(1))
  const [tabType, setTabType] = useState<TabType>(TabType.LIST)
  const [showDailyBrief, setDailyBrief] = useState(false)
  const tabTypeRowRef = useRef<HTMLUListElement | null>(null)

  const [detailState, getPlaylistDetail] = useAsyncRequest(
    Apis.getPlaylistDetail
  )
  const songDetail: any = detailState.value || {}
  // console.log(songDetail, '==== 歌单详情 ====')
  const creator = songDetail.creator || {}
  const songList: any = songDetail.tracks || []

  useEffect(
    () => {
      getPlaylistDetail({
        id
      })
    },
    [id, getPlaylistDetail]
  )

  useEffect(
    () => {
      const documentEle = document.getElementById('music-content')
      const tabTypeRowRefEle = tabTypeRowRef.current
      if (documentEle && tabTypeRowRefEle) {
        documentEle.addEventListener(
          'scroll',
          () => {
            const tabTypeRowRefTop = tabTypeRowRefEle.getBoundingClientRect()
              .top
            if (tabTypeRowRefTop > 50) {
              setDailyBrief(false)
            } else {
              setDailyBrief(true)
            }
          },
          false
        )
      }
    },
    [tabTypeRowRef]
  )

  const handleTabChange = tabType => {
    setTabType(tabType)
  }

  return (
    <div className={styles['songs-detail-wrap']}>
      <div className={styles['detail-title-content']}>
        <div className={styles['detail-img']}>
          <img src={songDetail.coverImgUrl} loading="lazy" alt="" />
        </div>
        <ul className={styles['detail-rows']}>
          <li className={styles['row-title']}>
            <div className={styles['title-name']}>歌单</div>
            <div className={styles['title']}>{songDetail.name}</div>
            {type === '3' && <div className={styles['edit-song-btn']} />}
          </li>
          <li>
            <img
              className={styles['songs-creator-img']}
              src={creator.avatarUrl}
              loading="lazy"
              alt=""
            />
            <div className={styles['songs-creator-name']}>
              {creator.nickname}
            </div>
            <div className={styles['create-time']}>
              {songDetail.createTime &&
                dayjs(songDetail.createTime).format('YYYY-MM-DD')}
              创建
            </div>
          </li>
          <li className={styles['row-actions']}>
            <PlayAllButton songs={songList} />
          </li>
        </ul>
      </div>
      <ul
        className={styles['songs-detail-tabs']}
        ref={ref => (tabTypeRowRef.current = ref)}
      >
        <li
          className={cn(tabType === TabType.LIST && styles['tab-active'])}
          onClick={() => handleTabChange(TabType.LIST)}
        >
          歌曲列表
        </li>
        <li
          className={cn(tabType === TabType.COMMENT && styles['tab-active'])}
          onClick={() => handleTabChange(TabType.COMMENT)}
        >
          评论
          <span>({songDetail.commentCount})</span>
        </li>
        <li
          className={cn(tabType === TabType.COLLECTORS && styles['tab-active'])}
          onClick={() => handleTabChange(TabType.COLLECTORS)}
        >
          收藏者
        </li>
      </ul>
      <BriefInfoTitle
        visible={showDailyBrief}
        title={songDetail.name}
        from={ROUTES.SONGS_DETAIL}
        songs={songList}
      />
      <TableSingleSong from={ROUTES.SONGS_DETAIL} songs={songList} />
    </div>
  )
}

export default SongsDetail
