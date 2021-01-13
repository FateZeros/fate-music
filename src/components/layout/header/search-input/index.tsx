import React from 'react'

import styles from './index.module.scss'

const SearchInput = () => {
  return (
    <div className={styles['search-input']}>
      <div className={styles['search-icon']} />
      <input placeholder="搜索" />
    </div>
  )
}

export default SearchInput
