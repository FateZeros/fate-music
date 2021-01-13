import React, { Component } from 'react'
import User from './user'
import Menu from './menu'
import styles from './index.module.scss'

class Sidebar extends Component {
  render() {
    return (
      <div className={styles.siderBar}>
        <User />
        <Menu />
      </div>
    )
  }
}

export default Sidebar
