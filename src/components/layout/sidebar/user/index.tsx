import React from 'react'

import styles from './index.module.scss'
import defaultUser from 'assets/image/default-user.png'

const User = () => {
  return (
    <div className={styles['user-wrap']}>
      <div className={styles['user-img']}>
        <img src={defaultUser} alt="" />
      </div>
      <div className={styles['user-name']}>未登录</div>
    </div>
  )
}

export default User
