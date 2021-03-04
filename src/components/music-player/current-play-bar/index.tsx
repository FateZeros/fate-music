import React from 'react'

import styles from './index.module.scss'

interface IProps {
  playingCurrentTime: number
  playingSong: any
}

const CurrentPlayBar: React.FC<IProps> = ({
  playingCurrentTime,
  playingSong
}) => {
  const playingSongTime = playingSong && playingSong.dt
  let playingPercent = ''
  if (playingSongTime && playingCurrentTime > 0) {
    playingPercent = `${Math.floor(
      (playingCurrentTime / playingSongTime) * 100
    )}%`
  }

  return (
    <div
      className={styles['music-play-bar']}
      style={{ width: `${playingPercent}` }}
    />
  )
}

export default CurrentPlayBar
