import React from 'react'

import styles from './index.module.scss'

const { useRef, useState, useCallback } = React
/**
 * 音乐播放器 - 音量
 */
const PlayerVolume = () => {
  const volumeLineRef = useRef<HTMLDivElement | null>(null)
  const volumeInnerLineRef = useRef<HTMLDivElement | null>(null)
  const [volumeInnerLineDrag, setVolumeInnerLineDrag] = useState(false)

  const [volumeInnerLineStartY, setVolumeInnerLineStartY] = useState(0)

  const playerVolume = 50

  const handleVolumeDotDown = useCallback(
    e => {
      if (volumeInnerLineRef.current) {
        setVolumeInnerLineStartY(e.pageY - volumeInnerLineRef.current.offsetTop)
        setVolumeInnerLineDrag(true)
      }
    },
    [volumeInnerLineRef]
  )

  const handleVolumeDotMove = useCallback(
    e => {
      const volumeLineEle = volumeLineRef.current
      const volumeInnerLineEle = volumeInnerLineRef.current
      if (volumeLineEle && volumeInnerLineEle) {
        if (volumeInnerLineDrag) {
          const lineHeight = volumeLineEle.clientHeight
          const innerLineHeight = volumeInnerLineEle.clientHeight

          let heightY = 0
          if (innerLineHeight < lineHeight) {
            heightY = e.pageY - volumeInnerLineStartY
          }
          console.log(heightY, 222)
        }
      }
    },
    [volumeInnerLineDrag, volumeLineRef, volumeInnerLineRef]
  )

  const handleVolumeDotUp = () => {
    setVolumeInnerLineDrag(false)
  }

  return (
    <div className={styles['music-setting-volume']}>
      <div className={styles['setting-volume-wrap']}>
        <div
          className={styles['setting-volume-line']}
          ref={ref => (volumeLineRef.current = ref)}
        >
          <div
            className={styles['setting-volume']}
            style={{ height: `${playerVolume}%` }}
            ref={ref => (volumeInnerLineRef.current = ref)}
            onMouseDown={e => handleVolumeDotDown(e)}
            onMouseMove={e => handleVolumeDotMove(e)}
            onMouseUp={() => handleVolumeDotUp()}
          >
            <div className={styles['setting-volume-dot']} />
          </div>
        </div>
        <div className={styles['settting-arrow']} />
      </div>
    </div>
  )
}

export default PlayerVolume
