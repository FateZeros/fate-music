import React from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import useClickAway from 'hooks/useClickAway'

import styles from './index.module.scss'
import CurrentList from './current-list'
import HistoryList from './history-list'

enum activeType {
  /** 播放列表 */
  CURRENT_LIST = 'CURRENT_LIST',
  /** 历史记录 */
  HISTORY_LIST = 'HISTORY_LIST'
}

interface IProps {}

const { useState, useRef, Fragment, useContext } = React
/**
 * 当前播放列表
 * 1. 播放列表 & 2.历史记录
 */
const CurrentPlayList: React.FC<IProps> = () => {
  const currentPlayListRef = useRef<HTMLDivElement | null>(null)
  const [state, dispatch] = useContext(ReducerContext)
  const { currentPlayListVisible } = state.musicPlayer

  useClickAway(currentPlayListRef, () => {
    dispatch({
      type: 'SHOW_CURRENT_PLAY_LIST',
      payload: {
        visible: false
      }
    })
  })

  const [activeTab, setActiveTab] = useState<activeType>(
    activeType.CURRENT_LIST
  )

  return (
    <div
      className={cn(
        currentPlayListVisible && styles['play-wrap-show'],
        styles['play-wrap']
      )}
      ref={ref => (currentPlayListRef.current = ref)}
    >
      <div className={styles['play-list-title-row']}>
        <div className={styles['play-list-title']}>
          <div
            className={cn(
              activeTab === activeType.CURRENT_LIST && styles['active-tab'],
              styles['current-list']
            )}
            onClick={() => setActiveTab(activeType.CURRENT_LIST)}
          >
            播放列表
          </div>
          <div
            className={cn(
              activeTab === activeType.HISTORY_LIST && styles['active-tab'],
              styles['history-list']
            )}
            onClick={() => setActiveTab(activeType.HISTORY_LIST)}
          >
            历史记录
          </div>
        </div>
      </div>
      <Fragment>
        {
          {
            [activeType.CURRENT_LIST]: <CurrentList />,
            [activeType.HISTORY_LIST]: <HistoryList />
          }[activeTab]
        }
      </Fragment>
    </div>
  )
}

export default CurrentPlayList
