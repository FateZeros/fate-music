import React, { Fragment, useState } from 'react'

import SearchList from '../search-list'

import styles from './index.module.scss'

const SearchInput = () => {
  const [searchListVisible, setSearchList] = useState(false)

  const handleHideSearchList = () => {
    setSearchList(false)
  }

  return (
    <Fragment>
      <div className={styles['search-input']}>
        <div className={styles['search-icon']} />
        <input placeholder="搜索" onFocus={() => setSearchList(true)} />
      </div>
      <SearchList
        visible={searchListVisible}
        onHideSearchList={handleHideSearchList}
      />
    </Fragment>
  )
}

export default SearchInput
