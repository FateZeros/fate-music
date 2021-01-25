import React from 'react'

import { ReducerContext } from 'reducers'
import * as loginApis from 'apis/login'
import useAsyncRequest from 'hooks/useAsyncRequest'

import styles from './index.module.scss'

const { useState, useContext } = React
/**
 * 登录 - 手机号码登录
 */
const PhoneLogin = () => {
  const [, dispatch] = useContext(ReducerContext)

  const [loginPhone, setLoginPhone] = useState<string>('')
  const [loginPwd, setLoginPwd] = useState<string>('')

  const [, loginCellphone] = useAsyncRequest(loginApis.loginCellphone)

  const handlePhoneLogin = async () => {
    const res = await loginCellphone({
      phone: loginPhone,
      password: loginPwd
    })
    if (res) {
      dispatch({
        type: 'SET_LOGIN_USERINFO',
        payload: res
      })
    }
  }

  return (
    <div className={styles.wrap}>
      <form className={styles['login-form']}>
        <div className={styles['login-row']}>
          <div className={styles['area-code']}>
            <div className={styles['area-code-img']} />
            <div className={styles['current-area-code']}>+86</div>
          </div>
          <div className={styles['input-row']}>
            <input
              placeholder="请输入手机号"
              autoComplete="off"
              value={loginPhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginPhone(e.target.value)
              }}
            />
          </div>
        </div>
        <div className={styles['login-row']}>
          <div className={styles['login-pwd-img']} />
          <div className={styles['input-row']}>
            <input
              placeholder="请输入密码"
              autoComplete="off"
              type="password"
              value={loginPwd}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginPwd(e.target.value)
              }}
            />
          </div>
          <div className={styles['reset-pwd']}>重设密码</div>
        </div>
        <div className={styles['login-btn']} onClick={handlePhoneLogin}>
          登录
        </div>
      </form>
    </div>
  )
}

export default PhoneLogin
