import React from 'react'
import cn from 'classnames'

import useClickAway from 'hooks/useClickAway'
import { getMusicPlayerList } from 'utils/music-player'

import styles from './index.module.scss'
import CurrentList from './current-list'
import HistoryList from './history-list'

interface IProps {
  visible: boolean
  onCloseCurrentPlayList: () => void
}

enum activeType {
  /** 播放列表 */
  CURRENT_LIST = 'CURRENT_LIST',
  /** 历史记录 */
  HISTORY_LIST = 'HISTORY_LIST'
}

const { useState, useRef } = React
/**
 * 当前播放列表
 * 1. 播放列表 & 2.历史记录
 */
const CurrentPlayList: React.FC<IProps> = ({
  visible,
  onCloseCurrentPlayList
}) => {
  const currentPlayListRef = useRef<HTMLDivElement | null>(null)
  useClickAway(currentPlayListRef, () => onCloseCurrentPlayList())

  const [activeTab, setActiveTab] = useState<activeType>(
    activeType.CURRENT_LIST
  )

  console.log(getMusicPlayerList(), '== 当前播放列表 ==')

  return (
    <div
      className={cn(visible && styles['play-wrap-show'], styles['play-wrap'])}
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
      <div className={styles['music-list-wrap']}>
        {
          {
            [activeType.CURRENT_LIST]: <CurrentList />,
            [activeType.HISTORY_LIST]: <HistoryList />
          }[activeTab]
        }
      </div>
    </div>
  )
}

export default CurrentPlayList
