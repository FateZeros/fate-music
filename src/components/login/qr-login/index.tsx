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
  const { value: qrKeyObj } = qrKeyValue

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

  console.log(qrKeyObj)

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
          <img
            src="data:image/png;base64,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"
            alt=""
          />
          <div className={styles['qrcode-tips']}>
            使用<span>网易云音乐APP</span>扫码登录
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default QrLogin
