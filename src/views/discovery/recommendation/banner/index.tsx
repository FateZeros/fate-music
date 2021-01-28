import React from 'react'
import cn from 'classnames'

import * as recommendApis from 'apis/recommendation'
import useAsyncRequest from 'hooks/useAsyncRequest'
import { TARGET_TYPE } from 'constants/constants'

import BannerItem from './banner-item'
import styles from './index.module.scss'

const { useState, useEffect, useMemo } = React

const Banner = () => {
  const [currentMid, setCurrentMid] = useState(0)

  const [state, getBannerList] = useAsyncRequest(recommendApis.getBannerList)
  const { value: banners = [] } = state

  useEffect(
    () => {
      const postData = { type: 1 }
      getBannerList(postData)
    },
    [getBannerList]
  )

  const bannersClassName = useMemo(
    () => {
      const len = banners.length
      const left = (currentMid - 1 + len) % len
      const right = (currentMid + 1) % len
      return {
        [currentMid]: styles.middle,
        [left]: styles.left,
        [right]: styles.right
      }
    },
    [currentMid, banners]
  )

  const handleBannerChange = (index: number) => {
    setCurrentMid(index)
  }

  const handleBannerItemClick = async (
    index: number,
    targetId: number,
    targetType: number
  ) => {
    setCurrentMid(index)
    if (targetType === TARGET_TYPE.MUSIC) {
      console.log(targetId)
    }
  }

  return (
    <div className={styles['banner-wrap']}>
      <div className={styles.banners}>
        {banners.map(({ pic, typeTitle, targetId, targetType }, index) => {
          const className = bannersClassName[index] || styles.hidden

          return (
            <BannerItem
              key={pic}
              title={typeTitle}
              pic={pic}
              className={className}
              onClick={() => handleBannerItemClick(index, targetId, targetType)}
            />
          )
        })}
      </div>
      <div className={styles.dots}>
        {banners.map((dot, index) => {
          return (
            <div
              key={dot.pic}
              className={cn(
                styles.dot,
                index === currentMid ? styles['dot-active'] : ''
              )}
              onMouseOver={() => handleBannerChange(index)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Banner
