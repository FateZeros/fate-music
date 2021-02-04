import { ThemeColor } from 'interfaces/common'

interface IThemeState {
  themeColor: ThemeColor
  colorSelectShow: Boolean
}

const themeState: IThemeState = {
  themeColor: ThemeColor.THEME_AUTO,
  colorSelectShow: false
}

const themeReducer = (state = themeState, action) => {
  const { colorSelectShow, themeColor } = action.payload || {}
  switch (action.type) {
    case 'SET_COLOR_SELECT_SHOW': {
      return {
        ...state,
        colorSelectShow
      }
    }
    case 'CHANGE_THEME_COLOR':
      return {
        themeColor
      }
    default:
      return state
  }
}

export default themeReducer
