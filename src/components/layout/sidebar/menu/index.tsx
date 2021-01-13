import React, { Fragment } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import cn from 'classnames'
import ROUTES from 'constants/routes'
import styles from './index.module.scss'

interface IMenuItems {
  icon: String
  label: string
  active?: boolean
  route: string
}

interface IMenu {
  id: number
  title?: string
  items: IMenuItems[]
}

const MENU: IMenu[] = [
  {
    id: 1,
    items: [
      {
        icon: 'music',
        label: '发现音乐',
        route: ROUTES.DISCOVERY
      },
      {
        icon: 'fm',
        label: '私人FM',
        route: ROUTES.FM
      },
      {
        icon: 'video',
        label: '视频',
        route: ROUTES.VIDEOS
      },
      {
        icon: 'friends',
        label: '朋友',
        route: ROUTES.FIRENDS
      }
    ]
  },
  {
    id: 2,
    title: '我的音乐',
    items: [
      {
        icon: 'itunes',
        label: 'iTunes 音乐',
        route: ROUTES.ITUNES
      },
      {
        icon: 'download',
        label: '下载管理',
        route: ROUTES.DOWNLOAD
      },
      {
        icon: 'my-cloud',
        label: '我的音乐云盘',
        route: ROUTES.MY_CLOUD
      },
      {
        icon: 'my-fm',
        label: '我的电台',
        route: ROUTES.MY_FM
      },
      {
        icon: 'my-collect',
        label: '我的收藏',
        route: ROUTES.MY_COLLECT
      }
    ]
  }
]

const Menu = () => {
  const history = useHistory()
  const { pathname } = useLocation()

  const handleMenuItemClick = (route: string) => {
    history.push(route)
  }

  return (
    <Fragment>
      {MENU.map(({ id, title, items }) => {
        return (
          <div className={styles['menu-wrap']} key={id}>
            {title && <div className={styles['menu-title']}>{title}</div>}
            <ul className={styles['menu-item']}>
              {items.map(({ icon, label, route }) => {
                const isActiveRoute = pathname.startsWith(route)
                return (
                  <li
                    key={route}
                    className={
                      isActiveRoute
                        ? cn(styles['menu-item-row'], styles['menu-row-active'])
                        : styles['menu-item-row']
                    }
                    onClick={() => handleMenuItemClick(route)}
                  >
                    <div
                      className={
                        isActiveRoute
                          ? styles[`menu-icon-${icon}-active`]
                          : styles[`menu-icon-${icon}`]
                      }
                    />
                    {label}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </Fragment>
  )
}

export default Menu
