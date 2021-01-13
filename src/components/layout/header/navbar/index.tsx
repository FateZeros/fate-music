import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './index.module.scss'

import { NAVBAR } from './nav.constants.js'

const Navbar = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  console.log(history, pathname, NAVBAR, '=====')

  return <div className={styles['navbar-wrap']}>1212</div>
}

export default Navbar
