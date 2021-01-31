import React from 'react'

import { IPersonalizedMVsResponse } from 'interfaces/recommendation'

import styles from './index.module.scss'

interface IProps {
  mvItem: IPersonalizedMVsResponse
  /* 一行显示的 item 个数*/
  rowItem: number
}
/**
 * MV - item
 */
const SingleMV: React.FC<IProps> = () => {
  return <div className={styles.wrap}>1212</div>
}

export default SingleMV
