import React from 'react'
import cn from 'classnames'

import useClickAway from 'hooks/useClickAway'
import * as searchApis from 'apis/search'
import useAsyncRequest from 'hooks/useAsyncRequest'
import {
  setSearchHistory,
  getSearchHistory,
  removeSearchHistory
} from 'utils/search'

import styles from './index.module.scss'

interface IProps {
  visible: boolean
  onHideSearchList: () => void
}
const { useRef, useEffect, useState } = React
/**
 * 搜索历史
 */
const SearchList: React.FC<IProps> = ({ visible, onHideSearchList }) => {
  const searchListRef = useRef<HTMLDivElement | null>(null)
  const [searchHisList, setSearchHisList] = useState<any[]>([])

  const [state, getSearchHotDetail] = useAsyncRequest(
    searchApis.getSearchHotDetail
  )
  const { value: hotDetailList = [] } = state
  // console.log(hotDetailList, '== 热搜 ==')

  useClickAway(searchListRef, () => {
    onHideSearchList()
  })

  useEffect(
    () => {
      getSearchHotDetail()
    },
    [getSearchHotDetail]
  )

  useEffect(() => {
    // 初始化搜索历史
    const hisList: any = getSearchHistory() || []
    setSearchHisList(hisList)
    // eslint-disable-next-line
  }, [])

  /*
   * 1. 置入搜索记录
   * 2. 显示搜索详情
   */
  const handleSearchDetail = item => {
    const resHistory: any[] = searchHisList
    console.log(resHistory, 11)
    console.log(item, 22)
    resHistory.push(item)
    console.log(resHistory, 33)
    // setSearchHisList(resHistory)

    const isExist = resHistory.findIndex(i => i.searchWord === item.searchWord)
    console.log(isExist, 1212)
    // console.log(item, searchHisList, isExist, '111')
    // if (!isExist) {
    //   resHistory.push(item)
    //   console.log(searchHisList, 222)
    //   // console.log(resHistory, 222)
    //   setSearchHisList(resHistory)
    //   // setSearchHistory(searchHisList)
    // }
    // const resHistory: string[] = Array.from(new Set(resArr))
  }

  const handleDelSearchList = () => {
    setSearchHisList([])
    removeSearchHistory()
  }

  return (
    <div
      className={cn(
        styles['search-list-wrap'],
        visible && styles['search-list-show']
      )}
      ref={ref => (searchListRef.current = ref)}
    >
      {searchHisList.length > 0 ? (
        <ul className={styles['search-history']}>
          <div className={styles['search-his-title']}>
            <div className={styles['title-word']}>搜索历史</div>
            <div
              className={styles['his-delete-icon']}
              onClick={handleDelSearchList}
            />
          </div>
          <div className={styles['his-list']}>
            {searchHisList.map((item, index) => {
              return (
                <div className={styles['list-item']} key={index}>
                  {item.searchWord}
                </div>
              )
            })}
          </div>
        </ul>
      ) : null}
      <ul className={styles['hot-detail-list']}>
        <div className={styles['detail-title']}>热搜榜</div>
        {hotDetailList.map((item, index) => {
          return (
            <li
              key={index}
              className={styles['detail-item']}
              onClick={() => handleSearchDetail(item)}
            >
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
