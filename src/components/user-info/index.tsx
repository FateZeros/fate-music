import React from 'react'
import cn from 'classnames'

import * as loginApis from 'apis/login'
import useAsyncRequest from 'hooks/useAsyncRequest'
import { ReducerContext } from 'reducers'
import useClickAway from 'hooks/useClickAway'
import { getUserInfo, removeUserInfo } from 'utils/auth'
import UserInfoRow from './userInfo.row'

import { userInfoCenter, userInfoSelf } from './constants'
import styles from './index.module.scss'

const { useContext, useRef } = React
/**
 * 登录后 - 个人信息展示
 */
const UserInfo = () => {
  const [state, dispatch] = useContext(ReducerContext)
  const { showUserInfoModal } = state.login

  const userInfoRef = useRef<HTMLDivElement | null>(null)
  useClickAway(userInfoRef, () => dispatch({ type: 'HIDE_USER_INFO' }))

  const [, logout] = useAsyncRequest(loginApis.logout)

  const userInfo: any = getUserInfo()

  const handleLogout = async () => {
    const res = await logout()
    if (res.code === 200) {
      dispatch({ type: 'LOG_OUT' })
      removeUserInfo()
    }
  }

  return (
    <div
      className={cn(showUserInfoModal && styles['show-user-info'], styles.wrap)}
      ref={ref => (userInfoRef.current = ref)}
    >
      <div className={styles['info-circle']}>
        <ul className={styles['info-circle-row']}>
          <li className={styles['circle-item']}>
            <div className={styles['item-num']}>
              {userInfo.profile && userInfo.profile.eventCount}
            </div>
            <div className={styles['item-word']}>动态</div>
          </li>
          <li className={styles['circle-item']}>
            <div className={styles['item-num']}>
              {userInfo.profile && userInfo.profile.follows}
            </div>
            <div className={styles['item-word']}>关注</div>
          </li>
          <li className={styles['circle-item']}>
            <div className={styles['item-num']}>
              {userInfo.profile && userInfo.profile.followeds}
            </div>
            <div className={styles['item-word']}>粉丝</div>
          </li>
        </ul>
        <div className={styles['circle-signin-row']}>
          <div className={styles['signin-btn']}>签到</div>
        </div>
      </div>
      <div className={styles['info-center']}>
        {userInfoCenter.map(item => {
          return (
            <UserInfoRow
              key={item.id}
              iconName={item.iconName}
              title={item.title}
              rightArrow={item.rightArrow}
            />
          )
        })}
      </div>
      <div className={styles['info-self']}>
        {userInfoSelf.map(item => {
          return (
            <UserInfoRow
              key={item.id}
              iconName={item.iconName}
              title={item.title}
              rightArrow={item.rightArrow}
            />
          )
        })}
      </div>
      <div className={styles['login-out']}>
        <UserInfoRow
          iconName="user-logout"
          title="退出登录"
          onRowClick={handleLogout}
        />
      </div>
    </div>
  )
}

export default UserInfo
