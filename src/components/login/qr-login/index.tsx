import React, { Fragment } from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import * as loginApis from 'apis/login'
import useAsyncRequest from 'hooks/useAsyncRequest'
import useInterval from 'hooks/useInterval'

import styles from './index.module.scss'

const { useContext, useEffect, useState } = React
/**
 * 登录方式 - QR登录
 */
const QrLogin = () => {
  const [state, dispatch] = useContext(ReducerContext)
  const { showLoginModal } = state.login

  const [, getLoginQrKey] = useAsyncRequest(loginApis.loginQrKey)
  const [, loginQrCreate] = useAsyncRequest(loginApis.loginQrCreate)
  const [, getLoginQrCheck] = useAsyncRequest(loginApis.loginQrCheck)

  // 二维码动画
  const [showQrCodeScale, setShowQrCodeType] = useState(false)
  // 获取二维码的 key
  const [loginQrKey, setLoginQrKey] = useState(undefined)
  // 是否获取二维码图片
  const [loginQrImg, setLoginQrImg] = useState(undefined)
  // 检查二维码的返回码
  const [loginQrCheckCode, serLoginQrCheckCode] = useState(801)

  useEffect(
    () => {
      const loginQrCodeAsync = async () => {
        const qrKeyObj: any = await getLoginQrKey()
        if (qrKeyObj.code === 200) {
          setLoginQrKey(qrKeyObj.unikey)
          const qrImgObj = await loginQrCreate(qrKeyObj.unikey)
          setLoginQrImg(qrImgObj.qrimg)
        }
      }
      if (showLoginModal) {
        loginQrCodeAsync()
      }
    },
    [showLoginModal, getLoginQrKey, loginQrCreate]
  )

  useInterval(() => {
    if (showLoginModal && loginQrKey) {
      if (loginQrCheckCode !== 801) {
        return false
      }
      getLoginQrCheck(loginQrKey).then(res => {
        const qrCheckCode = res.code
        serLoginQrCheckCode(qrCheckCode)
        // 检测到 app 扫码
        if (qrCheckCode === 803) {
          console.log(qrCheckCode, '=== 检测到扫码 ===')
          console.log(res, '=== 登录成功后的信息 ===')
          dispatch('SET_LOGIN_USERINFO')
        }
      })
    } else {
      return false
    }
  }, 1000 * 2)

  const handleLoginMouseEnter = () => {
    setShowQrCodeType(false)
  }

  const handleLoginMouseLeave = () => {
    setShowQrCodeType(true)
  }

  const handleRefreshQrCode = async () => {
    serLoginQrCheckCode(801)
    const qrKeyObj: any = await getLoginQrKey()
    const key: any = qrKeyObj.unikey
    setLoginQrKey(key)
    const qrImgObj = await loginQrCreate(key)
    setLoginQrImg(qrImgObj.qrimg)
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
          <div className={styles['qr-code-img']}>
            {loginQrImg && <img src={loginQrImg} alt="" />}
            {loginQrCheckCode === 800 && (
              <Fragment>
                <div className={styles['qr-code-expired']} />
                <div
                  className={styles['qr-code-refresh']}
                  onClick={handleRefreshQrCode}
                >
                  刷新二维码
                </div>
              </Fragment>
            )}
          </div>

          <div className={styles['qrcode-tips']}>
            使用<span>网易云音乐APP</span>扫码登录
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default QrLogin
