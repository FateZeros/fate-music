import { ThemeColor } from 'interfaces/common'

interface IThemeState {
  themeColor: ThemeColor
}

const themeState: IThemeState = {
  themeColor: ThemeColor.THEME_AUTO
}

const themeReducer = (state = themeState, action) => {
  switch (action.type) {
    case 'CHANGE_THEME_COLOR':
      return {
        themeColor: action.payload.themeColor
      }
    default:
      return state
  }
}

export default themeReducer
