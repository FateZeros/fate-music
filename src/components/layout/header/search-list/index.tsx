import React from 'react'
import cn from 'classnames'

import useClickAway from 'hooks/useClickAway'
import * as searchApis from 'apis/search'
import useAsyncRequest from 'hooks/useAsyncRequest'

import styles from './index.module.scss'

interface IProps {
  visible: boolean
  onHideSearchList: () => void
}
const { useRef, useEffect } = React
/**
 * 搜索历史
 */
const SearchList: React.FC<IProps> = ({ visible, onHideSearchList }) => {
  const searchListRef = useRef<HTMLDivElement | null>(null)

  const [state, getSearchHotDetail] = useAsyncRequest(
    searchApis.getSearchHotDetail
  )
  const { value: hotDetailList = [] } = state
  console.log(hotDetailList, '== 热搜 ==')

  useClickAway(searchListRef, () => {
    onHideSearchList()
  })

  useEffect(
    () => {
      getSearchHotDetail()
    },
    [getSearchHotDetail]
  )

  return (
    <div
      className={cn(
        styles['search-list-wrap'],
        visible && styles['search-list-show']
      )}
      ref={ref => (searchListRef.current = ref)}
    >
      <ul className={styles['hot-detail-list']}>
        <div className={styles['detail-title']}>热搜榜</div>
        {hotDetailList.map((item, index) => {
          return (
            <li key={index} className={styles['detail-item']}>
              <div
                className={cn(
                  styles['item-num'],
                  index < 3 && styles['item-red-num']
                )}
              >
                {index + 1}
              </div>
              <div className={styles['item-info']}>
                <div className={styles['item-word-row']}>
                  <div className={styles['item-word']}>{item.searchWord}</div>
                  {item.iconType === 1 && (
                    <div className={styles['item-hot-icon']} />
                  )}
                  <div className={styles['item-score']}>{item.score}</div>
                </div>
                <div className={styles['item-content']}>{item.content}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchList
