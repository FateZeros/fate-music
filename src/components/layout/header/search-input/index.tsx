import React, { Fragment, useState, useMemo, useRef } from 'react'

import { debounce } from 'utils'
import * as searchApis from 'apis/search'
import useAsyncRequest from 'hooks/useAsyncRequest'

import SearchList from '../search-list'
import styles from './index.module.scss'

const SearchInput = () => {
  const [searchListVisible, setSearchList] = useState(false)
  const [searchWord, setSearchWord] = useState('')
  const [state, getSearchSuggest] = useAsyncRequest(searchApis.getSearchSuggest)
  const inputRef = useRef<HTMLElement | null>(null)

  const handleHideSearchList = () => {
    setSearchList(false)
  }

  const handleChangeSearchWord = e => {
    const inputWord = e.target.value
    setSearchWord(inputWord)
    debounceSearchWordChange(inputWord)
  }

  const handleSearchWordChange = async (value: string) => {
    if (value) {
      await getSearchSuggest({ keywords: value })
    }
  }

  const debounceSearchWordChange = useMemo(
    () => debounce(handleSearchWordChange, 500),
    []
  )

  return (
    <Fragment>
      <div className={styles['search-input']}>
        <div className={styles['search-icon']} />
        <input
          placeholder="搜索"
          onFocus={() => setSearchList(true)}
          onChange={e => handleChangeSearchWord(e)}
          ref={ref => (inputRef.current = ref)}
        />
      </div>
      <SearchList
        visible={searchListVisible}
        onHideSearchList={handleHideSearchList}
        searchWord={searchWord}
        excludeRef={inputRef}
        searchResultValue={state.value || {}}
      />
    </Fragment>
  )
}

export default SearchInput
