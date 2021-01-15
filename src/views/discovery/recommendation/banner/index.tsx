import React from 'react'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import styles from './index.module.scss'

const { useEffect } = React

const Banner = () => {
  const [state, getBannerList] = useAsyncRequest(recommendApis.getBannerList)
  const { value: banners = [], loading: isGetBannerLoading } = state
  console.log(banners, isGetBannerLoading, 21212)

  useEffect(() => {
    getBannerList()
  }, [])

  return <div className={styles['banner-wrap']}>Banner</div>
}

export default Banner
