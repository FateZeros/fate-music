import React, { useContext } from 'react'

import { ReducerContext } from 'reducers'

// import * as loginApis from 'apis/login'
import styles from './index.module.scss'
import defaultUser from 'assets/image/default-user.png'

const User = () => {
  const [, dispatch] = useContext(ReducerContext)
  // componentDidMount() {
  // loginApis.loginCellphone({
  //   phone: '18627715406',
  //   password: 'yjf490293266'
  // })
  // }
  const handleShowLogin = () => {
    dispatch({ type: 'SHOW_LOGIN' })
  }

  return (
    <div className={styles['user-wrap']}>
      <div className={styles['user-img']}>
        <img src={defaultUser} alt="" />
      </div>
      <div className={styles['user-name']} onClick={handleShowLogin}>
        未登录
      </div>
    </div>
  )
}

export default User
