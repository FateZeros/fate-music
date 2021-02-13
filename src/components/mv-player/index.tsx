import React from 'react'

import styles from './index.module.scss'

interface IProps {
  url?: string
  poster?: string
}

const { useRef, useEffect } = React

const VedioPlayer: React.FC<IProps> = ({ url, poster }) => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null)

  return (
    <div className={styles['mv-video-wrap']}>
      <video
        ref={ref => (videoPlayerRef.current = ref)}
        preload="auto"
        controls
        poster={poster}
        src={url}
      >
        您的浏览器不支持视频播放
      </video>
    </div>
  )
}

export default VedioPlayer
