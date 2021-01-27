import React, { Fragment } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import cn from 'classnames'

import ROUTES from 'constants/routes'
import { getUserInfo } from 'utils/auth'

import styles from './index.module.scss'
/**
 * 音乐 APP 角色
 * T 游客，M 会员
 */
enum RoleType {
  T = 'tourist',
  M = 'member'
}

interface IMeta {
  role: RoleType
  pageTitle?: string
}

interface IMenuItems {
  icon: String
  label: string
  active?: boolean
  route: string
  meta?: IMeta
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
        route: ROUTES.MY_CLOUD,
        meta: {
          role: RoleType.T
        }
      },
      {
        icon: 'my-fm',
        label: '我的电台',
        route: ROUTES.MY_FM,
        meta: {
          role: RoleType.T
        }
      },
      {
        icon: 'my-collect',
        label: '我的收藏',
        route: ROUTES.MY_COLLECT,
        meta: {
          role: RoleType.T
        }
      }
    ]
  }
]

const Menu = () => {
  const history = useHistory()
  const { pathname } = useLocation()

  const userInfo: any = getUserInfo() || {}

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
              {items.map(({ icon, label, route, meta }) => {
                // 是否已激活
                const isActiveRoute = pathname.startsWith(route)
                // 是否需要登录
                if (meta && meta.role === RoleType.T && !userInfo.token) {
                  return null
                }

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
