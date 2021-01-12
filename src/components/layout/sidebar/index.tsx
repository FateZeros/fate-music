import React, { Component } from 'react'
import Menu from './menu'
import styles from './index.module.scss'

class Sidebar extends Component {
  render() {
    return (
      <div className={styles.siderBar}>
        <Menu />
      </div>
    )
  }
}

export default Sidebar
