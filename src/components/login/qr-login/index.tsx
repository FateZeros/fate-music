import React, { Fragment } from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import * as loginApis from 'apis/login'
import useAsyncRequest from 'hooks/useAsyncRequest'

import styles from './index.module.scss'

const { useContext, useEffect, useState } = React
/**
 * 登录方式 - QR登录
 */
const QrLogin = () => {
  const [state] = useContext(ReducerContext)
  const { showLoginModal } = state.login

  const [qrKeyValue, getLoginQrKey] = useAsyncRequest(loginApis.loginQrKey)
  const { value: qrObj } = qrKeyValue

  const [showQrCodeScale, setShowQrCodeType] = useState(false)

  useEffect(
    () => {
      if (showLoginModal) {
        console.log(showLoginModal, 'login modal')
        getLoginQrKey()
      }
    },
    [showLoginModal, getLoginQrKey]
  )

  const handleLoginMouseEnter = () => {
    setShowQrCodeType(false)
  }

  const handleLoginMouseLeave = () => {
    setShowQrCodeType(true)
  }

  return (
    <Fragment>
      <div className={styles['qr-title']}>扫码登录</div>
      <div
        className={styles['qr-code-content']}
        onMouseEnter={handleLoginMouseEnter}
        onMouseLeave={handleLoginMouseLeave}
      >
        <div
          className={cn(
            showQrCodeScale && styles['hide-left'],
            styles['qr-code-left']
          )}
        >
          <div className={styles['qr-code-guid']} />
        </div>
        <div
          className={cn(
            showQrCodeScale && styles['scale-right'],
            styles['qr-code-right']
          )}
        >
          <img src={qrObj && qrObj.qrimg} alt="" />
          <div className={styles['qrcode-tips']}>
            使用<span>网易云音乐APP</span>扫码登录
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default QrLogin
