import React, { useContext } from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import PlayerSongCollect from '../player-song-collect'
import PlayerSongShare from '../player-song-share'

import styles from './index.module.scss'

interface IProps {
  showCollectBtn: boolean
  showShareBtn: boolean
}

/**
 * 播放器操作按钮
 */
const PlayerAction: React.FC<IProps> = ({
  showCollectBtn = false,
  showShareBtn = false
}) => {
  const [state, dispatch] = useContext(ReducerContext)
  const { isPlayingSong } = state.musicPlayer

  const handleTogglePlaying = () => {
    dispatch({
      type: 'TOGGLE_PLAYING_SONG',
      payload: {
        isPlayingSong: !isPlayingSong
      }
    })
  }

  const handleChangePlayingSong = direction => {
    dispatch({
      type: 'CHANGE_CURRENT_PLAY_SONG',
      payload: {
        direction
      }
    })
  }

  return (
    <div className={styles['music-action-wrap']}>
      {showCollectBtn && <PlayerSongCollect />}
      <div className={styles['music-play-wrap']}>
        <div
          className={styles['music-action-pre']}
          onClick={() => handleChangePlayingSong('pre')}
        />
        <div
          className={cn(
            isPlayingSong
              ? styles['music-action-play']
              : styles['music-action-pouse']
          )}
          onClick={handleTogglePlaying}
        />
        <div
          className={styles['music-action-next']}
          onClick={() => handleChangePlayingSong('next')}
        />
      </div>
      {showShareBtn && <PlayerSongShare />}
    </div>
  )
}

export default PlayerAction
