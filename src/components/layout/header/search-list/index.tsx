import React from 'react'
import { useHistory } from 'react-router-dom'
import cn from 'classnames'

import useClickAway from 'hooks/useClickAway'
import * as searchApis from 'apis/search'
import useAsyncRequest from 'hooks/useAsyncRequest'
import {
  setSearchHistory,
  getSearchHistory,
  removeSearchHistory
} from 'utils/search'
import ROUTES from 'constants/routes'

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
  const history = useHistory()

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
    // useState 不可变对象变更，要深拷贝，才会引起视图变更
    const resHistory: any[] = searchHisList.concat()
    const isExist = resHistory.findIndex(i => i.searchWord === item.searchWord)
    if (isExist < 0) {
      resHistory.push(item)
      setSearchHisList(resHistory)
      setSearchHistory(resHistory)
    }
    history.push({
      pathname: ROUTES.SEARCH_RESULT_DETAIL,
      search: `word=${item.searchWord}&type=1`
    })
  }

  const handleDeleteHisList = (e, item) => {
    e.stopPropagation()
    const resHistory: any[] = searchHisList.concat()
    const result = resHistory.filter(i => i.searchWord !== item.searchWord)
    setSearchHisList(result)
    setSearchHistory(result)
  }

  const handleDelAllSearchList = () => {
    setSearchHisList([])
    removeSearchHistory()
  }

  const handleSearchHisChange = item => {
    history.push({
      pathname: ROUTES.SEARCH_RESULT_DETAIL,
      search: `word=${item.searchWord}&type=1`
    })
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
              onClick={handleDelAllSearchList}
            />
          </div>
          <div className={styles['his-list']}>
            {searchHisList.map((item, index) => {
              return (
                <div
                  className={styles['list-item']}
                  key={index}
                  onClick={() => handleSearchHisChange(item)}
                >
                  {item.searchWord}
                  <div
                    className={styles['item-word-del']}
                    onClick={e => handleDeleteHisList(e, item)}
                  >
                    x
                  </div>
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
