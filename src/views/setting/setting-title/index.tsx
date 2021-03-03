import React from 'react'

import styles from './index.module.scss'

interface IProps {
  title: string
}

const SettingTitle: React.FC<IProps> = ({ title }) => {
  return <div className={styles['setting-title']}>{title}</div>
}

export default SettingTitle
