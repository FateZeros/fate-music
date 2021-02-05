import React, { useContext } from 'react'
import cn from 'classnames'

import { ThemeColor } from 'interfaces/common'
import { ReducerContext } from 'reducers'
import { getThemeColor } from 'utils/theme'

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

const ThemeColorSelect: React.FC = () => {
  const [colorSelectState, dispatch] = useContext(ReducerContext)
  const { colorSelectShow } = colorSelectState.theme

  const handleSelectThemeColor = themeColor => {
    dispatch({
      type: 'CHANGE_THEME_COLOR',
      payload: {
        themeColor
      }
    })
    hideColorSelect()
  }

  const handleMouseLease = () => {
    setTimeout(() => {
      hideColorSelect()
    }, 1000)
  }

  const hideColorSelect = () => {
    dispatch({
      type: 'SET_COLOR_SELECT_SHOW',
      payload: {
        colorSelectShow: false
      }
    })
  }

  const currentThemeColor = getThemeColor() || ThemeColor.THEME_RED

  return (
    <div
      className={cn(
        styles['color-select-wrap'],
        colorSelectShow && styles['show-color-select']
      )}
      onMouseLeave={handleMouseLease}
    >
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
              {item.color === currentThemeColor && (
                <div className={styles['item-color-selected']} />
              )}
            </div>
            <div className={styles['item-name']}>{item.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ThemeColorSelect
