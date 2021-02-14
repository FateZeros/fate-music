import React from 'react'

import styles from './index.module.scss'

interface IProps {
  url?: string
  poster?: string
}

const { useRef, useState } = React

const VedioPlayer: React.FC<IProps> = ({ url, poster }) => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setPlayVideo] = useState(false)

  return (
    <div className={styles['mv-video-wrap']}>
      {!isPlaying && <div className={styles['video-play-btn']} />}
      <video
        ref={ref => (videoPlayerRef.current = ref)}
        preload="auto"
        controls
        poster={poster}
        src={url}
        onPlay={() => setPlayVideo(true)}
        onPause={() => setPlayVideo(false)}
      >
        您的浏览器不支持视频播放
      </video>
    </div>
  )
}

export default VedioPlayer
