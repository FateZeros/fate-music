import { setUserInfo } from 'utils/auth'

const loginState = {
  account: {},
  bindings: [],
  profile: {},
  token: '',
  showLoginModal: false,
  showUserInfoModal: false
}

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case 'SHOW_LOGIN':
      return {
        ...state,
        showLoginModal: true
      }
    case 'HIDE_LOGIN':
      return {
        ...state,
        showLoginModal: false
      }
    case 'SET_LOGIN_USERINFO': {
      const payload = action.payload
      // console.log(payload, '=== 登录信息 ===')
      setUserInfo(payload)
      return {
        account: payload.account,
        bindings: payload.bindings,
        profile: payload.profile,
        token: payload.token,
        showLoginModal: false
      }
    }
    case 'SHOW_USER_INFO':
      return {
        ...state,
        showUserInfoModal: true
      }
    case 'HIDE_USER_INFO':
      return {
        ...state,
        showUserInfoModal: false
      }
    case 'LOG_OUT': {
      return {
        ...state,
        token: ''
      }
    }
    default:
      return state
  }
}

export default loginReducer
