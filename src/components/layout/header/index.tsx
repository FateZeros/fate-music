import React, { Component } from 'react'

import RouteAction from './route-action'
import Navbar from './navbar'

import styles from './index.module.scss'

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <RouteAction />
        <Navbar />
      </div>
    )
  }
}

export default Header
