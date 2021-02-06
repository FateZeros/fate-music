import React from 'react'

import styles from './index.module.scss'

interface IProps {
  iconName: string
  word: string
}

const UserInfoRow: React.FC<IProps> = ({ iconName, word }) => {
  return <div className={styles['user-info-row']} />
}

export default UserInfoRow
