import React, { useContext } from 'react'
import { IPersonalizedNewsongs } from 'apis/types/recommendation'
import { ReducerContext } from 'reducers'
import styles from './index.module.scss'

interface IProps {
  songItem: IPersonalizedNewsongs
  sortNum: number
}

/**
 * 发现 - 最新音乐 - item
 */
const LatestSongItem: React.FC<IProps> = ({ songItem, sortNum }) => {
  const { name, picUrl, song } = songItem

  let songArtistName: string = ''
  song.artists.forEach(i => {
    songArtistName += `${i.name}/`
  })
  songArtistName = songArtistName.substr(0, songArtistName.length - 1)

  const [, dispatch] = useContext(ReducerContext)

  const handlePlayMusic = () => {
    dispatch({ type: 'TEST' })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles['wrap-img']}>
        <img src={picUrl} loading="lazy" alt="" />
        <div
          className={styles['play-icon']}
          onClick={() => handlePlayMusic()}
        />
      </div>
      <div className={styles['wrap-item-num']}> {sortNum}</div>
      <div className={styles['wrap-item-info']}>
        <div className={styles['item-name']}>{name}</div>
        <div className={styles['item-artist-name']}>{songArtistName}</div>
      </div>
    </div>
  )
}

export default LatestSongItem
