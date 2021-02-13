import React, { Fragment } from 'react'
import cn from 'classnames'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'qs'
import dayjs from 'dayjs'

import * as Apis from 'apis/mysong-list'
import useAsyncRequest from 'hooks/useAsyncRequest'
import PlayAllButton from 'components/play-all-button'
import CommonButtonNum from 'components/common-button-num'
import TableSingleSong from 'components/table-single-song'
import ROUTES from 'constants/routes'
import BriefInfoTitle from 'components/brief-info-title'
import CommentInput from 'components/comment-input'
import CollectorList from 'components/collector-list'
import { formatPlayCount } from 'utils'

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
  const history = useHistory()
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
  /* 创建者信息 */
  const creator = songDetail.creator || {}
  /* 歌曲列表 */
  const songList: any = songDetail.tracks || []
  /** 歌曲标签 */
  const songTags: any = songDetail.tags || []

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

  const handleGoSongList = () => {
    history.push(ROUTES.DISCOVERY_SONGLIST)
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
            <CommonButtonNum
              name="collect-songs"
              word="收藏"
              num={songDetail.subscribedCount}
              disable={type === '3' || songDetail.subscribed}
            />
            <CommonButtonNum
              name="share"
              word="分享"
              num={songDetail.shareCount}
            />
            <CommonButtonNum name="download" word="下载全部" />
          </li>
          <li className={styles['other-row']}>
            <div className={styles['other-row-label']}>标签</div>:
            {songTags.length ? (
              songTags.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div
                      className={styles['label-tag']}
                      onClick={handleGoSongList}
                    >
                      {item}
                    </div>
                    {index < songTags.length - 1 && (
                      <div className={styles['label-tag-line']}>/</div>
                    )}
                  </Fragment>
                )
              })
            ) : (
              <div className={styles['label-tag']}>添加标签</div>
            )}
          </li>
          <li className={styles['other-row']}>
            <div className={styles['other-row-label']}>歌曲数</div>:
            <span>{songList.length}</span>
            <div className={styles['other-row-label']}>播放数</div>:
            <span>{formatPlayCount(songDetail.playCount)}</span>
          </li>
          <li className={styles['other-row']}>
            <div className={styles['other-row-label']}>简介</div>:
            {songDetail.description ? (
              <div className={styles['other-row-info']}>
                {songDetail.description}
              </div>
            ) : (
              <div className={styles['label-tag']}>添加简介</div>
            )}
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
      {
        {
          [TabType.LIST]: (
            <TableSingleSong from={ROUTES.SONGS_DETAIL} songs={songList} />
          ),
          [TabType.COMMENT]: <CommentInput />,
          [TabType.COLLECTORS]: <CollectorList />
        }[tabType]
      }
    </div>
  )
}

export default SongsDetail
