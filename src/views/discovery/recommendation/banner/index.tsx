import React from 'react'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'

import BannerItem from './banner-item'
import styles from './index.module.scss'

const { useState, useEffect } = React

const Banner = () => {
  const [currentMid, setCurrentMid] = useState(0)

  const [state, getBannerList] = useAsyncRequest(recommendApis.getBannerList)
  const { value: banners = [], loading: isGetBannerLoading } = state

  useEffect(() => {
    const postData = { type: 1 }
    getBannerList(postData)
  }, [])

  return (
    <div className={styles['banner-wrap']}>
      <div className={styles.banners}>
        {banners.map(({ pic, typeTitle }, index) => {
          return <BannerItem key={pic} title={typeTitle} pic={pic} />
        })}
      </div>
      <div className={styles.dots}>
        {banners.map(dot => {
          return <div key={dot.pic} />
        })}
      </div>
    </div>
  )
}

export default Banner
