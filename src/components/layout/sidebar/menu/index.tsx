import React, { Fragment } from 'react'
import ROUTES from '../../../../constants/routes'
import styles from './index.module.scss'

interface IMenuItems {
  icon: string
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
        icon: '',
        label: '发现音乐',
        route: ROUTES.DISCOVERY
      },
      {
        icon: '',
        label: '私人FM',
        route: ROUTES.FM
      },
      {
        icon: '',
        label: '视频',
        route: ROUTES.VIDEOS
      },
      {
        icon: '',
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
        icon: '',
        label: 'iTunes 音乐',
        route: ROUTES.ITUNES
      },
      {
        icon: '',
        label: '下载管理',
        route: ROUTES.DOWNLOAD
      },
      {
        icon: '',
        label: '我的音乐云盘',
        route: ROUTES.MY_CLOUD
      },
      {
        icon: '',
        label: '我的电台',
        route: ROUTES.MY_FM
      },
      {
        icon: '',
        label: '我的收藏',
        route: ROUTES.MY_COLLECT
      }
    ]
  }
]

const Menu = () => {
  return (
    <Fragment>
      {MENU.map(({ id, title, items }) => {
        return (
          <div className={styles['menu-wrap']} key={id}>
            {title && <div className={styles['menu-title']}>{title}</div>}
            <div className={styles['menu-item']}>
              {items.map(({ icon, label, route }) => {
                return (
                  <div key={route} className={styles['menu-item-row']}>
                    {label}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}

export default Menu
