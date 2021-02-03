import React, { Fragment, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import cn from 'classnames'

import ROUTES from 'constants/routes'
import { getUserInfo } from 'utils/auth'

import styles from './index.module.scss'
import FavSongList from '../fav-song-list'
import CreateSongList from '../create-song-list'

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
  },
  {
    id: 3,
    title: '创建的歌单',
    items: []
  },
  {
    id: 4,
    title: '收藏的歌单',
    items: []
  }
]

const Menu = () => {
  const history = useHistory()
  const { pathname } = useLocation()

  const [favSongVisible, setFavSong] = useState(false)
  const [createSongVisible, setCreateSong] = useState(false)

  const userInfo: any = getUserInfo() || {}

  const handleMenuItemClick = (route: string) => {
    if (pathname !== route) {
      history.push(route)
    }
  }

  const handleFoldSongList = (id: number) => {
    switch (id) {
      case 3:
        setCreateSong(!createSongVisible)
        break
      case 4:
        setFavSong(!favSongVisible)
        break
      default:
        break
    }
  }

  return (
    <Fragment>
      {MENU.map(({ id, title, items }) => {
        return (
          <div className={styles['menu-wrap']} key={id}>
            {title && (
              <div
                className={cn(
                  [3, 4].includes(id) && styles['menu-title-pd'],
                  styles['menu-title-row']
                )}
              >
                {[3, 4].includes(id) && (
                  <div
                    className={cn(
                      id === 3 && createSongVisible && styles['fold-show'],
                      id === 4 && favSongVisible && styles['fold-show'],
                      styles['menu-title-fold']
                    )}
                    onClick={() => handleFoldSongList(id)}
                  />
                )}
                <div className={styles['menu-title']}>{title}</div>
                {[3].includes(id) && (
                  <div className={styles['menu-title-add']} />
                )}
              </div>
            )}
            {[1, 2].includes(id) && (
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
                          ? cn(
                              styles['menu-item-row'],
                              styles['menu-row-active']
                            )
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
            )}
            {
              {
                3: <CreateSongList visible={createSongVisible} />,
                4: <FavSongList visible={favSongVisible} />
              }[id]
            }
          </div>
        )
      })}
    </Fragment>
  )
}

export default Menu
