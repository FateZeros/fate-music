import React, { Component } from 'react'

// import * as loginApis from 'apis/login'
import styles from './index.module.scss'
import defaultUser from 'assets/image/default-user.png'

class User extends Component {
  componentDidMount() {
    // loginApis.loginCellphone({
    //   phone: '18627715406',
    //   password: 'yjf490293266'
    // })
  }

  render() {
    return (
      <div className={styles['user-wrap']}>
        <div className={styles['user-img']}>
          <img src={defaultUser} alt="" />
        </div>
        <div className={styles['user-name']}>未登录</div>
      </div>
    )
  }
}

export default User
