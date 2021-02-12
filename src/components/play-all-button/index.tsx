import React, { useContext, Fragment } from 'react'

import { ReducerContext } from 'reducers'

import styles from './index.module.scss'

interface IProps {
  songs: any
  briefIcon?: boolean
}
/**
 * 播放全部按钮
 */
const PlayAllButton: React.FC<IProps> = ({ songs, briefIcon = false }) => {
  const [, dispatch] = useContext(ReducerContext)

  const handlePlayAllSongs = () => {
    dispatch({
      type: 'SET_CURRENT_PLAYER_LIST',
      payload: {
        songs
      }
    })
    dispatch({
      type: 'TOGGLE_PLAYING_SONG',
      payload: {
        isPlayingSong: true
      }
    })
  }

  return (
    <Fragment>
      {briefIcon ? (
        <div className={styles['brief-wrap']} onClick={handlePlayAllSongs} />
      ) : (
        <div className={styles.wrap}>
          <div className={styles['wrap-play']} />
          <div className={styles['wrap-word']} onClick={handlePlayAllSongs}>
            播放全部
          </div>
          <div className={styles['wrap-add']} />
        </div>
      )}
    </Fragment>
  )
}

export default PlayAllButton
