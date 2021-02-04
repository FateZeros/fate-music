import React from 'react'

import { ThemeColor } from 'interfaces/common'

import styles from './index.module.scss'

const themeColors = [
  {
    id: 1,
    color: ThemeColor.THEME_WHITE,
    name: '浅色'
  },
  {
    id: 2,
    color: ThemeColor.THEME_RED,
    name: '红色'
  },
  {
    id: 3,
    color: ThemeColor.THEME_BLACK,
    name: '深色'
  },
  {
    id: 4,
    color: ThemeColor.THEME_AUTO,
    name: '自动'
  }
]

const ThemeColorSelect = () => {
  const handleSelectThemeColor = themeColor => {
    console.log(themeColor)
  }

  return (
    <div className={styles['color-select-wrap']}>
      <div className={styles['triangle']} />
      {themeColors.map(item => {
        return (
          <div className={styles['select-item']} key={item.id}>
            <div
              className={styles['item-color']}
              onClick={() => handleSelectThemeColor(item.color)}
            >
              <div
                className={styles['item-circle']}
                style={{ background: item.color }}
              />
              <div className={styles['item-color-selected']} />
            </div>
            <div className={styles['item-name']}>{item.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ThemeColorSelect
