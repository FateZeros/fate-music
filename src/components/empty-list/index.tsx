import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import ROUTES from 'constants/routes'
import { ReducerContext } from 'reducers'

import styles from './index.module.scss'

interface IProps {
  word: string
  route?: string
  showLink?: boolean
}

const EmptyList: React.FC<IProps> = ({
  word = '没有数据',
  route = ROUTES.DISCOVERY,
  showLink = true
}) => {
  const history = useHistory()
  const [, dispatch] = useContext(ReducerContext)

  const handleGoDiscovery = () => {
    history.push(route)
    dispatch({
      type: 'SHOW_CURRENT_PLAY_LIST',
      payload: {
        visible: false
      }
    })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.word}>{word}</div>
      {showLink && (
        <div className={styles['go-discovery']}>
          去首页<span onClick={handleGoDiscovery}>发现音乐</span>
        </div>
      )}
    </div>
  )
}

export default EmptyList
