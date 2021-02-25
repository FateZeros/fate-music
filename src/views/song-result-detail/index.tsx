import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import cn from 'classnames'
import qs from 'qs'

import * as searchApis from 'apis/search'
import useAsyncRequest from 'hooks/useAsyncRequest'
import TableSingleSong from 'components/table-single-song'
import ROUTES from 'constants/routes'

import { searchTabs, resultTypes } from './constants'
import styles from './index.module.scss'

const { useEffect } = React
/*
 * 搜索结果 - 歌曲结果
 */
const SongResultDetail = () => {
  const history = useHistory()
  const { search } = useLocation()
  const { word, type } = qs.parse(search.substr(1))
  const [state, getSearchResultList] = useAsyncRequest(
    searchApis.getSearchResultList
  )
  const songs: any = state.value && state.value.songs
  const count: any = state.value && state.value.songCount

  useEffect(
    () => {
      getSearchResultList({
        type,
        limit: 100,
        keywords: word
      })
    },
    [getSearchResultList, type, word]
  )

  const handleSearchTypeChange = type => {
    history.push({
      pathname: ROUTES.SONG_RESULT_DETAIL,
      search: `word=${word}&type=${type}`
    })
  }

  return (
    <div className={styles['result-detail-wrap']}>
      <div className={styles['detail-top-content']}>
        <div className={styles['detail-top-title-row']}>
          <div className={styles['top-title']}>{word}</div>
          <div className={styles['top-title-count']}>
            找到&nbsp;{count}&nbsp;{resultTypes[type]}
          </div>
        </div>
        <ul className={styles['detail-top-tabs']}>
          {searchTabs.map(item => {
            return (
              <li
                key={item.value}
                className={cn(
                  styles['tab-item'],
                  item.value === +type && styles['item-active']
                )}
                onClick={() => handleSearchTypeChange(item.value)}
              >
                {item.label}
              </li>
            )
          })}
        </ul>
      </div>
      <div className={styles['detail-content']}>
        {
          {
            1: (
              <TableSingleSong
                from={ROUTES.SONG_RESULT_DETAIL}
                songs={songs || []}
              />
            )
          }[type]
        }
      </div>
    </div>
  )
}

export default SongResultDetail
