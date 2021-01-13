import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import cn from 'classnames'

import styles from './index.module.scss'
import { NAVBAR } from './nav.constants.js'

const Navbar = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  // 一级路由
  const firstRoutes = Object.keys(NAVBAR)
  const currentFirstRoute = firstRoutes.find(item => pathname.startsWith(item))
  // 二级路由
  const secondRoutes = NAVBAR[currentFirstRoute] || []

  const handleRouteChange = route => {
    if (route) history.push(route)
  }

  return (
    <div className={styles['navbar-wrap']}>
      {secondRoutes.map(secondRoute => {
        const isActive = secondRoute.route === pathname || !secondRoute.route

        return (
          <div
            key={secondRoute.label}
            className={
              isActive
                ? cn(styles['navbar-item'], styles['active-route'])
                : styles['navbar-item']
            }
            onClick={() => handleRouteChange(secondRoute.route)}
          >
            {secondRoute.label}
          </div>
        )
      })}
    </div>
  )
}

export default Navbar
