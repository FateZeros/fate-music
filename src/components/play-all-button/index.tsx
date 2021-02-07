import React, { useContext } from 'react'

import { ReducerContext } from 'reducers'

import styles from './index.module.scss'

interface IProps {
  songs: any
}
/**
 * 播放全部按钮
 */
const PlayAllButton: React.FC<IProps> = ({ songs }) => {
  const [, dispatch] = useContext(ReducerContext)

  const handlePlayAllSongs = () => {
    dispatch({
      type: 'SET_CURRENT_PLAYER_LIST',
      payload: {
        songs
      }
    })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles['wrap-play']} />
      <div className={styles['wrap-word']} onClick={handlePlayAllSongs}>
        播放全部
      </div>
      <div className={styles['wrap-add']} />
    </div>
  )
}

export default PlayAllButton
